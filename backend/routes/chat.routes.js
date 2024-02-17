const router = require("express").Router();
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
// CHATGPT

const userConversations = {};
function initializeConversation(uid, convId) {
  userConversations[uid][convId] = [
    {
      role: "system",
      content:
        "Tu es un assistant d'une grande aide et tes réponses sont toujours concises et courtes jusqu'à 512 caractères. Tu peux utiliser jusqu'à 128 tokens dans ta réponse.",
    },
  ];
}
router.post("/chat", async (req, res) => {
  try {
    const { prompt, uid, convId } = req.body;
    if (!userConversations[uid]) {
      userConversations[uid] = {};
      initializeConversation(uid, convId); // Initialize conversation with system message
    } else if (!userConversations[uid][convId]) {
      initializeConversation(uid, convId); // Initialize conversation with system message if the conversation does not exist
    }
    userConversations[uid][convId] = [
      ...userConversations[uid][convId],
      { role: "user", content: prompt },
    ];
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: userConversations[uid][convId],
      temperature: 1,
      max_tokens: 128,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    userConversations[uid][convId] = [
      ...userConversations[uid][convId],
      {
        role: "assistant",
        content: response.choices[0].message.content,
      },
    ];

    res
      .status(200)
      .send([
        userConversations[uid][convId][
          userConversations[uid][convId].length - 2
        ],
        userConversations[uid][convId][
          userConversations[uid][convId].length - 1
        ],
      ]);
  } catch (err) {
    res.status(500).send(err);
  }
});
// END CHATGPT

router.delete("/deleteAllUserChats", async (req, res) => {
  try {
    const { uid } = req.body;
    if (!userConversations[uid]) {
      res.status(200).send("no content already");
    } else {
      delete userConversations[uid];
      res.status(200).send("chats deleted with success");
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

router.delete("/deleteOneChat", async (req, res) => {
  try {
    const { uid, convId } = req.body;
    if (!userConversations[uid] || userConversations[uid][convId]) {
      res.status(200).send("no content already");
    } else {
      delete userConversations[uid][convId];
      res.status(200).send("conv deleted with success");
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;

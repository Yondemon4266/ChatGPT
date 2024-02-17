import EmptyConversation from "./EmptyConversation";
import { conversations } from "../signals/Chatgpt";
import { MessageType } from "../signals/GPTTypes";
import { currentConversation } from "../signals/ConversationSignals";
import ChatGPTMessage from "./ChatGPTMessage";
import UserMessage from "./UserMessage";
export default function Conversation() {
  const currentConv = conversations.value[currentConversation.value];

  const isConversationEmpty =
    !currentConv ||
    !currentConv.messages ||
    currentConv.messages.length === 0 ? (
      <EmptyConversation />
    ) : (
      currentConv.messages.map((conv: MessageType, index) => {
        if (conv.role === "assistant") {
          return (
            <ChatGPTMessage
              key={index}
              message={conv.content}
              isEnd={currentConv.messages.length - 1 === index}
            />
          );
        } else if (conv.role === "user") {
          return <UserMessage key={index} message={conv.content} />;
        }
      })
    );
  return (
    <div className="w-1/2 h-fit flex flex-col  gap-4 py-6 max-xl:w-3/5 max-lg:w-4/5 max-sm:w-11/12 max-md:pt-8">
      {isConversationEmpty}
    </div>
  );
}

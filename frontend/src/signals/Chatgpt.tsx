import { effect, signal } from "@preact/signals-react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { pushSingleConversation } from "./ConversationSignals";
import { ConversationsType } from "./GPTTypes";
import { loading } from "./Loading";

// Conversations signal, get and save
export const conversations = signal<ConversationsType>(getConversations());

function getConversations(): ConversationsType | [] {
  const value = localStorage.getItem("conversations");
  if (value == null)
    return [{ id: uuidv4(), messages: [], title: "New conversation" }];
  return JSON.parse(value);
}

effect(() =>
  localStorage.setItem("conversations", JSON.stringify(conversations.value))
);
// END Conversations signal, get and save

export async function PromptChatgpt(
  prompt: string,
  convId: string | number,
  uid: string
) {
  try {
    loading.value = true;
    const response = await axios({
      method: "post",
      url: `${import.meta.env.VITE_SERVER_URL}/chat`,
      data: { prompt, convId, uid },
    });
    pushSingleConversation(response.data, convId);
    console.log(response.data);
  } catch (err) {
    console.log(err);
  } finally {
    loading.value = false;
  }
}

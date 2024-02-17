import { effect, signal } from "@preact/signals-react";
import { conversations } from "./Chatgpt";
import { ChatGPTResponseConversationType, ConversationType } from "./GPTTypes";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { userId } from "./UserID";

// PUSH SINGLE CONV TO ALL CONVS
export function pushSingleConversation(
  res: ChatGPTResponseConversationType,
  id: string | number
) {
  const conversationIndex = conversations.value.findIndex(
    (el: ConversationType) => el.id === id
  );
  if (conversationIndex !== -1) {
    conversations.value = conversations.value.map(
      (conv: ConversationType, index: number) => {
        if (index === conversationIndex) {
          return { ...conv, messages: [...conv.messages, ...res] };
        } else {
          return conv;
        }
      }
    );
  }
}
// END PUSH SINGLE CONV TO ALL CONVS

// CURRENT CONV

export const currentConversation = signal<number>(getCurrentConversation());

function getCurrentConversation(): number {
  const value = localStorage.getItem("currentConversation");
  if (value == null) return 0;
  return JSON.parse(value);
}

export function changeCurrentConversation(index: number) {
  currentConversation.value = index;
}
// END CURRENT CONV

// ADD NEW CONVERSATION

export function AddNewConversation() {
  console.log("hello");

  conversations.value = [
    ...conversations.value,
    { id: uuidv4(), messages: [], title: "New conversation" },
  ];
  changeCurrentConversation(conversations.value.length - 1);
}
// END ADD NEW CONVERSATION

//  Remove CONVERSATION

export function RemoveConversation(idx: number, convId: string | number) {
  if (conversations.value.length === 1) {
    AddNewConversation();
  }
  conversations.value = conversations.value.filter(
    (_conv, index: number) => index !== idx
  );
  changeCurrentConversation(0);
  axios({
    url: ` ${import.meta.env.VITE_SERVER_URL}/deleteOneChat`,
    method: "delete",
    data: { uid: userId.value, convId },
  })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
}
// END  Remove CONVERSATION

// REMOVE ALL CONVS

export function RemoveAllConversations() {
  conversations.value = [
    { id: uuidv4(), messages: [], title: "New conversation" },
  ];
  changeCurrentConversation(0);
  axios({
    url: ` ${import.meta.env.VITE_SERVER_URL}/deleteAllUserChats`,
    method: "delete",
    data: { uid: userId.value },
  })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
}

// END REMOVE ALL CONVS

effect(() =>
  localStorage.setItem(
    "currentConversation",
    JSON.stringify(currentConversation.value)
  )
);

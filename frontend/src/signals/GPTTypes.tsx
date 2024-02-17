export type MessageType = {
  role: string;
  content: string;
};

export type ConversationType = {
  id: number | string;
  messages: MessageType[];
  title: string;
};
export type ConversationsType = ConversationType[];

export type ChatGPTResponseConversationType = Array<{
  role: string;
  content: string;
}>;
export enum Role {
  USER = "user",
  ASSISTANT = "assistant",
}

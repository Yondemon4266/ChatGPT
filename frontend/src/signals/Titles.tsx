import { conversations } from "./Chatgpt";
import { ConversationType } from "./GPTTypes";

export function ChangeTitle(title: string, id: number | string) {
  conversations.value = conversations.value.map((conv: ConversationType) => {
    if (conv.id === id) {
      return { ...conv, title: title };
    } else {
      return conv;
    }
  });
}

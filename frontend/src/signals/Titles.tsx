import { conversations } from "./Chatgpt";
import { ConversationType } from "./GPTTypes";

export function ChangeTitle(title: string, id: number | string) {
  conversations.value = conversations.value.map((conv: ConversationType) => {
    if (conv.id === id) {
      console.log("on y est bieng" + title);

      return { ...conv, title: title };
    } else {
      console.log("on y est pas");

      return conv;
    }
  });
}

import { useState } from "react";
import { theme } from "../signals/Theme";
import { VerifTheme } from "../utility/VerifTheme";
import { PromptChatgpt, conversations } from "../signals/Chatgpt";
import { userId } from "../signals/UserID";
import { currentConversation } from "../signals/ConversationSignals";
import { loading } from "../signals/Loading";
import { FaRegStopCircle } from "react-icons/fa";

export default function Input() {
  const [text, setText] = useState("");

  const handleTextAreaAutoExpand = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + 4 + "px";
  };

  const buttonStyle = () => {
    if (theme.value.darkBool) {
      if (text) {
        return "bg-white";
      } else {
        return "bg-zinc-800";
      }
    } else {
      if (text) {
        return "bg-zinc-800";
      } else {
        return "bg-zinc-300";
      }
    }
  };
  return (
    <div
      className="z-50 h-24 fixed bottom-0 left-1/2 -translate-x-1/2 flex items-center w-[52%] max-xl:w-3/5 max-lg:w-4/5 max-sm:w-11/12"
      style={{ background: VerifTheme(theme.value.dark, theme.value.light) }}
    >
      <div className="relative w-full h-auto">
        <textarea
          placeholder="Message ChatGPT..."
          className={`w-full max-md:text-sm h-auto p-3 pr-12 bg-transparent text-left border-2 rounded-lg outline-none  resize-none overflow-hidden ${VerifTheme(
            "border-zinc-700 focus:border-zinc-600",
            "border-zinc-200 focus:border-zinc-300"
          )}  `}
          value={text}
          rows={1}
          disabled={loading.value}
          onChange={(e) => {
            handleTextAreaAutoExpand(e);
            setText(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              if (!loading.value && text) {
                PromptChatgpt(
                  text,
                  conversations.value[currentConversation.value].id,
                  userId.value
                );
                setText("");
              }
            }
          }}
        />
        {!loading.value && (
          <button
            type="button"
            disabled={!text || loading.value}
            className={` ${buttonStyle()} absolute right-3 bottom-[1.15rem] rounded-lg w-7 h-7 flex items-center justify-center`}
            onClick={() => {
              PromptChatgpt(
                text,
                conversations.value[currentConversation.value].id,
                userId.value
              );
              setText("");
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              style={
                theme.value.darkBool
                  ? { color: theme.value.dark }
                  : { color: theme.value.light }
              }
            >
              <path
                d="M7 11L12 6L17 11M12 18V7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </button>
        )}
        {loading.value && (
          <button
            type="button"
            className="absolute right-3 bottom-[1.15rem] rounded-lg w-7 h-7"
          >
            <FaRegStopCircle
              style={
                theme.value.darkBool
                  ? { color: theme.value.light }
                  : { color: theme.value.dark }
              }
              size={24}
            />
          </button>
        )}
      </div>
    </div>
  );
}

import { PromptChatgpt, conversations } from "../signals/Chatgpt";
import { currentConversation } from "../signals/ConversationSignals";
import { loading } from "../signals/Loading";
import { theme } from "../signals/Theme";
import { userId } from "../signals/UserID";
import { VerifTheme } from "../utility/VerifTheme";

export default function SuggestionButton({
  hidden,
  text,
  title,
}: {
  hidden: boolean;
  text: string;
  title: string;
}) {
  const currentConv = conversations.value[currentConversation.value];

  return (
    <button
      type="button"
      className={`group relative text-left py-2 px-3 border-[1px]  rounded-xl ${VerifTheme(
        "border-zinc-700  hover:bg-zinc-700",
        "border-zinc-200 hover:bg-zinc-300"
      )} ${hidden ? "max-md:hidden" : ""}`}
      onClick={() => {
        if (!loading.value) {
          PromptChatgpt(
            text,
            currentConv?.id
              ? conversations.value[currentConversation.value].id
              : "",
            userId.value
          );
        }
      }}
    >
      <h3 className="font-semibold text-base max-md:text-sm">{title}</h3>
      <p
        className={`${VerifTheme(
          "text-gray-400",
          "text-gray-500"
        )} text-sm max-md:text-xs`}
      >
        {text}
      </p>
      <span
        className={`absolute right-2 top-1/2 -translate-y-1/2  invisible group-hover:visible rounded-md ${VerifTheme(
          "bg-zinc-600",
          "bg-white"
        )}`}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          style={
            theme.value.darkBool
              ? { color: theme.value.light }
              : { color: theme.value.dark }
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
      </span>
    </button>
  );
}

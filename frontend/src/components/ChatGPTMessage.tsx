import { WordsDisplay } from "../hooks/WordsDisplay";

export default function ChatGPTMessage({
  message,
  isEnd,
}: {
  message: string;
  isEnd: boolean;
}) {
  return (
    <div className="flex gap-3 max-md:text-sm max-sm:text-xs">
      <img
        src="./chatgptlogo.png"
        alt="logo"
        className="z-50  w-7 h-7 rounded-full"
      />
      <div>
        <div>
          <h3 className="font-bold ">ChatGPT</h3>
        </div>
        <div className="flex flex-row gap-2 items-center ">
          <div className="text-justify break-words">
            {isEnd && <WordsDisplay text={message} delay={5} />}
            {!isEnd && <p>{message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

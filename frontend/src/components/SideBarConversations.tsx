import { useState } from "react";
import {
  RemoveConversation,
  currentConversation,
} from "../signals/ConversationSignals";
import { HiOutlineTrash } from "react-icons/hi2";
import { AiFillEdit } from "react-icons/ai";

import { TruncateText } from "../utility/TruncateText";
import { ChangeTitle } from "../signals/Titles";
import { VerifTheme } from "../utility/VerifTheme";

export default function SideBarConversations({
  title,
  id,
  index,
}: Readonly<{
  title: string;
  id: string | number;
  index: number;
}>) {
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [renaming, setRenaming] = useState(false);
  return (
    <div
      role="button"
      className={`w-full h-8 rounded-lg flex items-center justify-between ${VerifTheme(
        "hover:bg-zinc-700 ",
        "hover:bg-zinc-300 "
      )}  text-left p-2 pr-3
        ${
          currentConversation.value === index
            ? VerifTheme("bg-zinc-800", "bg-zinc-200")
            : ""
        }
      `}
      onBlur={() => setIsOptionsVisible(false)}
      onClick={() => (currentConversation.value = index)}
    >
      {renaming && (
        <input
          type="text"
          value={newTitle}
          onChange={(e) => {
            setNewTitle(e.target.value);
          }}
          onBlur={() => {
            ChangeTitle(newTitle, id);
            setRenaming(false);
          }}
          className={`${VerifTheme(
            "text-white",
            "text-black"
          )} bg-transparent w-full focus:outline-sky-500 outline-none`}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              ChangeTitle(newTitle, id);
              setRenaming(false);
            }
          }}
          autoFocus={true}
        />
      )}

      {!renaming && <p className="max-sm:text-sm">{TruncateText(newTitle)}</p>}
      <button
        type="button"
        className=" relative text-lg pb-2 duration-100"
        onClick={() => setIsOptionsVisible((prev) => !prev)}
      >
        <p className="hover:text-zinc-400 ml-2">...</p>
        {isOptionsVisible && (
          <div
            className={`z-[1000] absolute top-7 right-0 h-fit w-44 group p-2 flex flex-col items-start gap-2 ${VerifTheme(
              "bg-zinc-700",
              "bg-zinc-300"
            )} rounded-lg`}
          >
            <div
              className={`flex gap-2 items-center w-full ${VerifTheme(
                "hover:text-zinc-300",
                "hover:text-zinc-500"
              )} `}
              role="button"
              onClick={() => setRenaming(true)}
            >
              <AiFillEdit />
              <p>Rename</p>
            </div>
            <div
              className="flex gap-2 items-center text-red-400 hover:text-red-600 w-full"
              role="button"
              onClick={() => RemoveConversation(index, id)}
            >
              <HiOutlineTrash />
              <p>Delete</p>
            </div>
          </div>
        )}
      </button>
    </div>
  );
}

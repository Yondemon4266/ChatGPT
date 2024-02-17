import { AiOutlineCaretRight } from "react-icons/ai";
import { isSideBarOpen } from "../signals/SideBarSignals";
import SideBarConversations from "./SideBarConversations";
import AddConversation from "./AddConversation";
import { conversations } from "../signals/Chatgpt";
import { ConversationType } from "../signals/GPTTypes";
import { VerifTheme } from "../utility/VerifTheme";
import { RemoveAllConversations } from "../signals/ConversationSignals";
import { HiOutlineTrash } from "react-icons/hi2";
import { useState } from "react";

export default function SideBar() {
  const [removeAllVisible, setRemoveAllVisible] = useState(false);
  console.log(isSideBarOpen.value);

  return (
    <>
      <button
        type="button"
        className={`z-[100000] absolute top-1/2  -translate-y-1/2 text-3xl ${VerifTheme(
          "text-zinc-500 hover:text-zinc-100",
          "text-zinc-600 hover:text-zinc-400"
        )} duration-150 transition-all ${
          isSideBarOpen.value ? "-rotate-180 left-72" : "left-2"
        } `}
        onClick={() => {
          isSideBarOpen.value = !isSideBarOpen.value;
        }}
      >
        <AiOutlineCaretRight />
      </button>
      <div
        className={`z-[1000000] w-72 h-screen max-h-screen absolute left-0 top-0 max-sm:w-5/6 p-3 pb-0 flex flex-col gap-2 items-start overflow-y-scroll overflow-x-hidden  transition-all duration-300 ${
          isSideBarOpen.value ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ backgroundColor: `${VerifTheme("#191919", "#F9F9F9")}` }}
      >
        <div className=" flex items-center justify-between w-full mb-3 hover:bg-zinc-200 p-2 rounded-xl cursor-default">
          <div className="flex items-center gap-2">
            <img
              src="./chatgptlogo.png"
              alt="logo"
              className="z-50  w-7 h-7 rounded-full block"
            />
            <h3 className="font-semibold text-base max-lg:text-sm">New chat</h3>
          </div>
          <AddConversation isSideBar={true} />
        </div>
        {conversations.value.map((conv: ConversationType, index: number) => (
          <SideBarConversations
            key={conv.id}
            index={index}
            id={conv.id}
            title={
              conv.messages.length > 0 ? conv.messages[0].content : conv.title
            }
          />
        ))}

        <div className="z-[50] sticky bottom-0 left-0 text-red-400 hover:text-red-500 duration-150  h-24 p-2 bg-inherit w-full flex items-center">
          <button
            type="button"
            className="flex flex-row gap-2 items-center"
            onClick={() => setRemoveAllVisible((prev) => !prev)}
          >
            <HiOutlineTrash />
            <p>Supprimer tous les chats </p>
          </button>
        </div>
      </div>
      {removeAllVisible && (
        <div
          className={`cursor-default z-[1000000] fixed w-1/4 h-1/4 max-xl:w-1/3 max-lg:w-1/2 max-md:w-11/12 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg ${VerifTheme(
            "bg-zinc-700 border-[1px] border-zinc-500",
            "bg-zinc-100 border-[1px] border-zinc-300"
          )}  flex flex-col items-center justify-center gap-2 p-4`}
          onClick={(e) => e.stopPropagation()}
        >
          <p
            className={`pb-8  text-lg text-center max-md:text-sm ${VerifTheme(
              "text-white",
              "text-black"
            )}`}
          >
            Voulez-vous vraiment supprimer toutes vos conversations?
          </p>
          <div className="flex gap-4 justify-between w-full">
            <span
              className={`cursor-pointer w-2/5 max-md:text-sm flex items-center justify-center text-red-400 hover:text-red-500 duration-100 p-1 rounded-lg border-[1px] border-red-500 hover:border-red-600 text-center`}
              onClick={() => {
                RemoveAllConversations();
                setRemoveAllVisible(false);
              }}
            >
              <p>Confirmer</p>
            </span>
            <span
              className={`cursor-pointer flex max-md:text-sm items-center justify-center w-2/5 border-[1px] p-1 rounded-lg duration-100 ${VerifTheme(
                "text-white border-zinc-400 hover:text-zinc-200 hover:border-zinc-500",
                "text-black border-zinc-200 hover:text-zinc-900 hover:border-zinc-300"
              )} text-center`}
              onClick={(e) => {
                e.stopPropagation();
                setRemoveAllVisible(false);
              }}
            >
              <p>Annuler</p>
            </span>
          </div>
        </div>
      )}
    </>
  );
}

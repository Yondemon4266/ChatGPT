import AddConversation from "./components/AddConversation";
import ChangeThemeBtn from "./components/ChangeThemeBtn";
import Conversation from "./components/Conversation";
import Input from "./components/Input";
import SideBar from "./components/Sidebar";
import { theme } from "./signals/Theme";
import { VerifTheme } from "./utility/VerifTheme";
export default function App() {
  return (
    <div
      className={` z-50 pt-20 pb-24 w-screen h-screen flex flex-col items-center justify-between    overflow-y-auto ${VerifTheme(
        "text-white",
        "text-black"
      )} `}
      style={{
        background: VerifTheme(theme.value.dark, theme.value.light),
      }}
    >
      <div
        className={`h-20 w-screen absolute top-0 left-0 flex justify-between items-center px-10 z-[500000]`}
        style={{
          backgroundColor: VerifTheme(theme.value.dark, theme.value.light),
        }}
      >
        <AddConversation isSideBar={false} />
        <div
          style={{
            backgroundColor: VerifTheme(theme.value.dark, theme.value.light),
          }}
        >
          <div className="flex gap-2 items-center max-md:flex-col max-md:gap-1 ">
            <h2 className="text-lg font-semibold max-lg:text-base">
              ChatGPT 3.5
            </h2>
            <span className="font-semibold max-lg:text-sm text-zinc-400">
              By Yonde
            </span>
          </div>
        </div>
        <ChangeThemeBtn />
      </div>
      <SideBar />
      <Conversation />
      <Input />
    </div>
  );
}

import { theme } from "../signals/Theme";
import { BsFillMoonFill, BsSunFill } from "react-icons/bs";
import { VerifTheme } from "../utility/VerifTheme";

export default function ChangeThemeBtn() {
  return (
    <div className="   flex gap-4 max-md:gap-2 max-sm:gap-1 text-2xl max-md:text-base max-sm:text-sm max-md:flex-col">
      <button
        type="button"
        className={`px-2 py-1 border-2 ${VerifTheme(
          "border-gray-200",
          "border-transparent"
        )} rounded-xl`}
        onClick={() => (theme.value = { ...theme.value, darkBool: true })}
      >
        <BsFillMoonFill
          className={`${VerifTheme("text-white", "text-black")} `}
        />
      </button>
      <button
        onClick={() => (theme.value = { ...theme.value, darkBool: false })}
        type="button"
        className={`px-2 py-1 border-2  ${VerifTheme(
          "border-transparent",
          "border-orange-500"
        )} rounded-xl`}
      >
        <BsSunFill
          className={`${VerifTheme(
            "text-white",
            "text-orange-500"
          )} duration-150`}
        />
      </button>
    </div>
  );
}

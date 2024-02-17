import { FaUserCircle } from "react-icons/fa";

export default function UserMessage({ message }: { message: string }) {
  return (
    <div className="flex gap-3 max-md:text-sm max-sm:text-xs">
      <FaUserCircle className={`z-50 w-8 h-8 `} />
      {/* <span className="z-50 w-8 h-8 rounded-full  bg-blue-500" /> */}
      <div>
        <div>
          <h3 className="font-bold ">You</h3>
        </div>
        <div className="flex flex-row gap-2 items-center ">
          <div className="text-justify break-words">{message}</div>
        </div>
      </div>
    </div>
  );
}

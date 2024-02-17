export default function EmptyConversation() {
  return (
    <div className="relative h-full flex pb-14 flex-col items-center justify-center">
      <div className=" flex items-center justify-center flex-col gap-3 -translate-y-full">
        <div className={`p-2 w-fit h-fit bg-white rounded-full`}>
          <img
            src="./chatgptlogo2.png"
            alt="logo"
            className="w-10 h-10 max-md:w-8 max-md:h-8 rounded-full"
          />
        </div>
        <h2 className="font-bold text-2xl max-md:text-xl">
          How can I help you today?
        </h2>
      </div>
    </div>
  );
}

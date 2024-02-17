import SuggestionButton from "./SuggestionButton";

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
      <div className=" w-full grid grid-cols-2 grid-rows-2 gap-2 max-md:grid-cols-1 pb-3">
        <SuggestionButton
          hidden={false}
          text="Quelles sont les façons de rester motivé et persévérant face aux défis? "
          title="Challenge"
        />
        <SuggestionButton
          hidden={false}
          text="Quelle est la plus grande statue du monde? "
          title="Statue"
        />
        <SuggestionButton
          hidden={true}
          text="Quels sont les plus grands accomplissements de l'humanité dans le domaine de la science et de la technologie? "
          title="Humanité"
        />
        <SuggestionButton
          hidden={true}
          text="Quels sont les moyens efficaces pour gérer le stress au quotidien?"
          title="Gérer son stress"
        />
      </div>
    </div>
  );
}

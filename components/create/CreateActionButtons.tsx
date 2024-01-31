import React from "react";
import Icon from "../Icon";
import PopupOver from "../popups/Popup";
import Button from "../Button";
import { useRouter } from "next/navigation";

export default function CreateActionButtons() {
  return (
    <div>
      <PopupOver content={<Content />}>
        <button className="hover:bg-gray-200 transition-all duration-300 rotate-90 rounded-full flex justify-center items-center px-2 py-1">
          {" "}
          <Icon name="ThreeDots" className="text-black" />
        </button>
      </PopupOver>
    </div>
  );
}

function Content() {
  const router = useRouter();

  function ExitWithoutSaving() {
    sessionStorage.removeItem("editorContent");
    router.push("/");
  }

  return (
    <div className="bg-white flex flex-col items-start w-max px-5 py-2 gap-2 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
      <Button
        icon="Save"
        iconClassName="text-black"
        className="text-black gap-3"
      >
        Save to Drafts
      </Button>
      <Button
        icon="Exit"
        iconClassName="text-red-600"
        className=" text-red-600 gap-3"
        onClick={ExitWithoutSaving}
      >
        Exit Without Saving
      </Button>
    </div>
  );
}

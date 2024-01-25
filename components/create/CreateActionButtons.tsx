import React from "react";
import Icon from "../Icon";
import PopupOver from "../popups/Popup";
import Button from "../Button";

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
  return (
    <div className="bg-white flex flex-col items-start w-max px-5 py-2 gap-2 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
      <Button
        icon="Save"
        iconClassName="text-black"
        className="text-black gap-2 hover:bg-gray-200"
      >
        Save to Drafts
      </Button>
      <Button
        icon="Exit"
        iconClassName="text-white"
        className=" gap-2 text-white bg-red-600 hover:bg-red-500"
      >
        Exit Without Saving
      </Button>
    </div>
  );
}

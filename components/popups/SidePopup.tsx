import React, { ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Button from "../Button";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  align?: "left" | "right";
  children: ReactNode;
  title?: string;
}

export default function SidePopup({
  isOpen,
  onClose,
  align = "right",
  title = "Comments",
  children,
}: Props) {
  const sideSection = useRef<HTMLDivElement | null>(null);
  useEffect(
    () => {
      const handleOutsideClick = (event: MouseEvent) => {
        if (!sideSection.current) {
          return;
        }
        if (isOpen && !sideSection.current.contains(event.target as Node)) {
          onClose();
        }
      };

      document.addEventListener("mousedown", handleOutsideClick);
      return () => {
        document.removeEventListener("mousedown", handleOutsideClick);
      };
    },
    //eslint-disable-next-line react-hooks/exhaustive-deps
    [isOpen]
  );

  return createPortal(
    <div
      className={`bg-black/10  ${
        isOpen ? "visible opacity-100" : "invisible opacity-0"
      } fixed inset-0 z-50 flex justify-center items-center transition-opacity duration-300`}
      aria-hidden={!isOpen}
    >
      <div
        ref={sideSection}
        className={`flex flex-col gap-1 border-t-gray-500 sm:border-none translate-y-0 bottom-0 sm:translate-y-0 rounded-3xl sm:rounded-none overflow-y-auto w-full sm:w-96 px-2 h-[calc(100%-80px)] sm:h-full shadow-lg fixed py-5 sm:top-0 bg-white transition-transform duration-300 ${
          isOpen
            ? align === "right"
              ? "sm:right-0 sm:translate-x-0"
              : "sm:left-0 sm:translate-x-0"
            : align === "right"
            ? "sm:right-full sm:translate-x-full"
            : "sm:left-full sm:-translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
      >
        <div className=" flex items-center justify-between">
          <h3 className="font-bold text-xl">{title}</h3>
          <Button
            onClick={onClose}
            icon="Close"
            iconClassName="text-2xl font-light"
          >
            <></>
          </Button>
        </div>
        {isOpen ? children : <></>}
      </div>
    </div>,
    document.body
  );
}

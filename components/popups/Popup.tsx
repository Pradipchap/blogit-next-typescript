"use client";

import React, {
  Fragment,
  ReactElement,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

interface dropdownProps {
  children: ReactNode;
  content: ReactNode;
}

export default function PopupOver({ children, content }: dropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setposition] = useState<{
    top?: number | undefined;
    right?: number | undefined;
    left?: number | undefined;
    bottom?: number | undefined;
  }>({ top: 0, right: 0 });

  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const popupRef = useRef<HTMLDivElement | null>(null);

  function getPostition() {
    const x = buttonRef.current?.getBoundingClientRect().right;
    const y = buttonRef.current?.getBoundingClientRect().y;
    const screenWidth = window.innerWidth;
    const popupWidth = popupRef.current?.getBoundingClientRect().width;

    if (typeof y !== "undefined" && typeof x !== "undefined") {
      const top = Math.ceil(y) + (buttonRef.current?.clientHeight || 0);
      const right =
        Math.ceil(x) -
        (buttonRef.current?.clientWidth || 0) / 2 -
        (popupWidth || 0) / 2;
      if ((right + (popupWidth || 0) || 0) > screenWidth) {
        return { top: top, left: screenWidth - (popupWidth || 0) };
      } else return { top: top, left: right };
    } else {
      return {};
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      const popupElement = popupRef.current;
      const targetElement = buttonRef.current;

      if (
        popupElement &&
        targetElement &&
        !popupElement.contains(event.target as Node) &&
        !targetElement.contains(event.target as Node)
      ) {
        closePopup();
      }
    };
    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  function closePopup() {
    setIsOpen(false);
  }

  useEffect(() => {
    function handleScreenSize() {
      const position = getPostition();
      setposition(position);
    }

    window.addEventListener("resize", handleScreenSize);
    return () => window.removeEventListener("click", handleScreenSize);
  }, []);

  useEffect(
    () => {
      const position = getPostition();
      setposition(position);
    },

    //eslint-disable-next-line react-hooks/exhaustive-deps
    [popupRef.current, isOpen]
  );

  return (
    <Fragment>
      {
        <div
          ref={buttonRef}
          {...(children as ReactElement).props}
          onClick={() => {
            setIsOpen((isOpen) => !isOpen);
            const pos = getPostition();
            setposition(pos);
          }}
          className={(children as ReactElement).props.className}
        >
          {children}
        </div>
      }
      {isOpen &&
        createPortal(
          <div
            id="popupEl"
            ref={popupRef}
            style={{
              position: "fixed",
              ...position,
            }}
          >
            {content}
          </div>,
          document.body
        )}
    </Fragment>
  );
}

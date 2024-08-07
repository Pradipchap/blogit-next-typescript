"use client";
import {
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
  targetIndependent?: boolean;
}

export default function PopupOver({
  children,
  content,
  targetIndependent = false,
}: dropdownProps) {
  const tagName = (children as ReactElement).type;
  const isInput = tagName === "input" || tagName === "form";
  const [isOpen, setIsOpen] = useState(false);
  const [position, setposition] = useState<{
    top: number;
    left: number;
  } | null>(null);

  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const popupRef = useRef<HTMLDivElement | null>(null);

  function setWidth() {
    if (targetIndependent) return {};
    else {
      const width = buttonRef.current?.getBoundingClientRect().width;
      return { width };
    }
  }

  function getPostition() {
    const x = buttonRef.current?.getBoundingClientRect().right;
    const y = buttonRef.current?.getBoundingClientRect().y;
    const buttonHeight = buttonRef.current?.getBoundingClientRect().height;
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const popupWidth = popupRef.current?.getBoundingClientRect().width;
    const popupHeight = popupRef.current?.getBoundingClientRect().height;

    if (!buttonRef.current || !popupRef.current) {
      return null;
    }
    if (typeof y !== "undefined" && typeof x !== "undefined") {
      const top = Math.ceil(y) + (buttonRef.current?.clientHeight || 0);
      const right =
        Math.ceil(x) -
        (buttonRef.current?.clientWidth || 0) / 2 -
        (popupWidth || 0) / 2;
      if ((right + (popupWidth || 0) || 0) > screenWidth) {
        return { top: top, left: screenWidth - (popupWidth || 0) };
      } else if ((top + (popupHeight || 0) || 0) > screenHeight) {
        return {
          top: screenHeight - (popupHeight || 0) - (buttonHeight || 0),
          left: right,
        };
      } else return { top: top, left: right };
    } else {
      return null;
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const popupElement = popupRef.current;
      const targetElement = buttonRef.current;
      const target = event.target as HTMLElement;
      const tagName = target.tagName;

      if (popupElement && targetElement) {
        if (!popupElement.contains(target) && !targetElement.contains(target)) {
          closePopup();
          return;
        }
        if (popupElement.contains(target) && event.button === 0) {
          {
            const parentTagName = target.parentElement?.tagName;
            if (
              tagName === "BUTTON" ||
              tagName === "A" ||
              parentTagName === "BUTTON" ||
              parentTagName === "A"
            )
              closePopup();
          }
        }
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
      //eslint-disable-next-line
      setposition(position);
    }

    window.addEventListener("resize", handleScreenSize);
    return () => window.removeEventListener("click", handleScreenSize);
  }, []);

  useEffect(
    () => {
      if (!popupRef.current) {
        return;
      }
      const position = getPostition();
      setposition(position);
    },

    //eslint--next-line react-hooks/exhaustive-deps
    [isOpen]
  );

  return (
    <Fragment>
      {
        <div
          ref={buttonRef}
          {...(children as ReactElement).props}
          onChange={() => {
            setIsOpen(true);
          }}
          onClick={(event) => {
            const element = event.target as HTMLElement;
            if (element.tagName === "INPUT") {
              return;
            }
            if (isInput) {
              if (!isOpen) setIsOpen((isOpen) => !isOpen);
            } else {
              setIsOpen((isOpen) => !isOpen);
            }
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
            className="transition-all h-max w-max duration-300 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] bg-transparent"
            style={{
              position: "fixed",
              ...position,
              ...setWidth(),
            }}
          >
            {content}
          </div>,
          document.body
        )}
    </Fragment>
  );
}

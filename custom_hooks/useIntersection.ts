import { RefObject, useEffect, useState } from "react";

interface props {
  watcher: RefObject<HTMLAnchorElement>;
  buttonRef: RefObject<HTMLButtonElement>;
}

export default function useIntersection({ watcher, buttonRef }: props) {
  useEffect(() => {
    const watcherElement = watcher.current;
    const buttonElement = buttonRef.current;
    if (!watcherElement || !buttonElement) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        console.log(entries[0].isIntersecting);
        if (entries[0].isIntersecting) {
          console.log("first");
          buttonElement.style.opacity = "0%";
        } else {
          buttonElement.style.opacity = "100%";
        }
      },
      {
        root: buttonElement.parentElement,
      }
    );

    observer.observe(watcherElement);

    return () => {
      observer.unobserve(watcherElement);
      observer.disconnect();
    };
  }, [buttonRef, watcher]);
}

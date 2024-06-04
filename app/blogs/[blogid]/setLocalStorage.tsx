"use client";
// SetLocalStorage.tsx
import { useEffect } from "react";

interface SetLocalStorageProps {
  title: string;
  description: string;
  genre: string;
}

const SetLocalStorage: React.FC<SetLocalStorageProps> = ({
  title,
  description,
  genre,
}) => {
  useEffect(() => {
    localStorage.setItem(
      "recent",
      JSON.stringify({ title, description, genre })
    );
  }, [title, description, genre]);

  return null;
};

export default SetLocalStorage;

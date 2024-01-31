"use client";
import React, { ReactNode, useState } from "react";
import Button from "@/components/Button";
import EditProfile from "./EditProfile";
import Modal from "@/components/popups/Modal";

export default function ProfileSection({ children }: { children: ReactNode }) {
  const [isProfileEditOpen, setIsProfileEditOpen] = useState(false);
  return (
    <div className="flex flex-col gap-2 py-10 justify-center items-center px-5">
      {children}
      <Button
        icon="Edit"
        onClick={() => setIsProfileEditOpen(true)}
        iconClassName="text-green-700 text-base"
        className="text-green-700 text-sm border p-2 m-5 border-green-700 hover:bg-green-100/80"
      >
        Edit Profile
      </Button>
      {isProfileEditOpen && (
        <Modal onclose={() => setIsProfileEditOpen(false)}>
          <EditProfile onclose={() => setIsProfileEditOpen(false)}/>
        </Modal>
      )}
    </div>
  );
}

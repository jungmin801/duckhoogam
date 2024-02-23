"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ConfirmModal from "../../common/ConfirmModal";
import { createPortal } from "react-dom";

const SignOut = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSignOut = async () => {
    const response = await fetch("/api/auth/signOut", { method: "POST" });
    if (response.ok) {
      router.push("/");
      router.refresh();
    }
  };

  const handleModal = () => {
    if (!isOpen) {
      setIsOpen(true);
    }
  };

  const signOutContent = {
    main: "로그아웃 하시겠습니까?",
    confirm: "Logout",
    cancel: "Cancel",
  };

  return (
    <>
      <button className="px-3 font-custom-bd button" onClick={handleModal}>
        <Image
          src={"/asset/image/icon-logout.svg"}
          alt=""
          width={20}
          height={20}
        />
        Logout
      </button>
      {isOpen &&
        createPortal(
          <ConfirmModal
            setIsOpen={setIsOpen}
            content={signOutContent}
            fn={handleSignOut}
          />,
          document.body
        )}
    </>
  );
};

export default SignOut;

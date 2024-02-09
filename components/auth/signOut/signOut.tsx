"use client";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";

const SignOut = () => {
  const router = useRouter();
  const handleSignOut = async () => {
    const response = await fetch("/api/auth/signOut", { method: "POST" });
    if (response.ok) {
      router.refresh();
    }
  };
  return (
    <button className="px-3 font-custom-bd button" onClick={handleSignOut}>
      <Image
        src={"/asset/image/icon-logout.svg"}
        alt=""
        width={20}
        height={20}
      />
      Logout
    </button>
  );
};

export default SignOut;

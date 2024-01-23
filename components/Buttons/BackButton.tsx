"use client";
import { useRouter } from "next/navigation";
import React from "react";

const BackButton = () => {
  const router = useRouter();
  return (
    <button
      type="button"
      className="w-16 h-16 pt-4 bg-custom-blue rounded-r-lg text-white font-bold bg-arrowTop bg-no-repeat bg-[center_top]"
      onClick={() => {
        router.back();
      }}
    />
  );
};

export default BackButton;

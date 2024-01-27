"use client";
import React from "react";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();
  return (
    <button
      type="button"
      className="w-16 h-16 pt-4 font-bold text-white bg-center bg-no-repeat rounded-r-lg bg-custom-gray-200 bg-arrowLeft"
      onClick={() => {
        router.back();
      }}
    />
  );
};

export default BackButton;

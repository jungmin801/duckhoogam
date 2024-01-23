"use client";
import React from "react";

const TopButton = () => {
  return (
    <button
      type="button"
      className="absolute bottom-0 right-0 w-16 h-16 pt-4 bg-custom-blue rounded-t-lg text-white font-bold bg-arrowTop bg-no-repeat bg-[center_top]"
      onClick={() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    >
      Top
    </button>
  );
};

export default TopButton;

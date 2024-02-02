"use client";
import React from "react";
import styles from "./Buttons.module.css";

const TopButton = () => {
  return (
    <button
      type="button"
      className="absolute right-0 bottom-0 rounded-t-lg w-16 h-16 pt-4 bg-custom-blue text-white font-custom-bd bg-no-repeat bg-[center_top] bg-arrowTop"
      onClick={() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    >
      Top
    </button>
  );
};

export default TopButton;

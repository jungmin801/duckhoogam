"use client";
import React from "react";
import styles from "./Buttons.module.css";

const TopButton = () => {
  return (
    <button
      type="button"
      className={` rounded-t-lg ${styles.moveBtn} bg-arrowTop`}
      onClick={() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    >
      Top
    </button>
  );
};

export default TopButton;

"use client";
import React from "react";
import { useRouter } from "next/navigation";
import styles from "./Buttons.module.css";

const BackButton = () => {
  const router = useRouter();
  return (
    <button
      type="button"
      className={`rounded-r-lg ${styles.moveBtn} bg-arrowLeft`}
      onClick={() => {
        router.back();
      }}
    />
  );
};

export default BackButton;

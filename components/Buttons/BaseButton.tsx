import React from "react";
import styles from "./Button.module.css";
import Link from "next/link";

const BaseButton = ({
  link,
  isFilled,
  txt,
}: {
  link: string | null;
  isFilled: boolean;
  txt: string;
}) => {
  if (link) {
    return (
      <Link
        href={link}
        className={`${styles.btn} ${isFilled ? styles.filled : styles.outline}`}
      >
        {txt}
      </Link>
    );
  }

  return (
    <button
      className={`${styles.btn} ${isFilled ? styles.filled : styles.outline}`}
    >
      {txt}
    </button>
  );
};

export default BaseButton;

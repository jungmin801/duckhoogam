import React from "react";
import styles from "./Buttons.module.css";
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
        className={`inline-block px-6 py-2.5 rounded-xl font-bold text-xl border border-solid ${
          isFilled ? styles.filled : styles.outline
        }`}
      >
        {txt}
      </Link>
    );
  }

  return (
    <button
      className={`inline-block px-6 py-2.5 rounded-xl font-bold text-xl border border-solid ${
        isFilled ? styles.filled : styles.outline
      }`}
    >
      {txt}
    </button>
  );
};

export default BaseButton;

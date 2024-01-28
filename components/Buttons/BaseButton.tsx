import React from "react";
import styles from "./Buttons.module.css";
import Link from "next/link";

interface BaseButtonProps {
  link: string | null;
  isFilled: boolean;
  txt: string;
}

const BaseButton = ({ link, isFilled, txt }: BaseButtonProps) => {
  const filledStyle =
    "bg-custom-blue text-white border-custom-blue hover:text-custom-blue hover:border-custom-blue hover:bg-transparent";

  const outlineStyle =
    "text-custom-blue border-custom-blue hover:bg-custom-blue hover:text-white hover:border-transparent;";

  if (link) {
    return (
      <Link
        href={link}
        className={`inline-block px-6 py-2.5 rounded-xl font-bold text-xl border border-solid ${
          isFilled ? filledStyle : outlineStyle
        }`}
      >
        {txt}
      </Link>
    );
  }

  return (
    <button
      className={`inline-block px-6 py-2.5 rounded-xl font-bold text-xl border border-solid ${
        isFilled ? filledStyle : outlineStyle
      }`}
    >
      {txt}
    </button>
  );
};

export default BaseButton;

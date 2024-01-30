import React from "react";
import Link from "next/link";

interface BaseButtonProps {
  isSubmit?: boolean;
  link?: string;
  isFilled: boolean;
  txt: string;
  width?: string;
}

const BaseButton = ({
  isSubmit,
  link,
  isFilled,
  txt,
  width,
}: BaseButtonProps) => {
  const filledStyle = "bg-custom-blue text-white border-custom-blue";
  const outlineStyle = "text-custom-blue border-custom-blue ";

  if (link) {
    return (
      <Link
        href={link}
        className={`inline-block px-6 py-2.5 rounded-xl font-bold border border-solid ${width} ${
          isFilled ? filledStyle : outlineStyle
        }`}
      >
        {txt}
      </Link>
    );
  }

  return (
    <button
      type={isSubmit ? "submit" : "button"}
      className={`inline-block px-6 py-2.5 rounded-xl font-bold border border-solid ${width} ${
        isFilled ? filledStyle : outlineStyle
      }`}
    >
      {txt}
    </button>
  );
};

export default BaseButton;

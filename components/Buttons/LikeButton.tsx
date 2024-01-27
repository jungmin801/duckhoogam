import React from "react";
import LikeIcon from "../../public/asset/image/icon-like.svg";

const LikeButton = () => {
  return (
    <button className="flex items-center justify-center h-10 gap-2 duration-300 ease-in border border-solid rounded-lg group w-28 shrink-0 border-custom-red hover:text-white hover:bg-custom-red">
      <LikeIcon className="duration-300 ease-in text-custom-red group-hover:text-white" />
      Like
    </button>
  );
};

export default LikeButton;

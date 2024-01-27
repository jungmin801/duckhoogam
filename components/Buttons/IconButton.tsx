"use client";
import React from "react";
import styles from "./Buttons.module.css";
import DeleteIcon from "../../public/asset/image/icon-delete.svg";
import ModifyIcon from "../../public/asset/image/icon-modify.svg";

const IconButton = ({ type }: { type: string }) => {
  return (
    <button
      className={`w-14 h-14 rounded-xl bg-custom-gray-200 group duration-300 ease-in ${
        type === "delete" ? "hover:bg-custom-red" : "hover:bg-custom-blue"
      }`}
    >
      {type === "delete" ? (
        <DeleteIcon className="m-auto text-custom-red group-hover:text-white " />
      ) : (
        <ModifyIcon className="m-auto group-hover:text-white" />
      )}
    </button>
  );
};

export default IconButton;

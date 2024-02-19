"use client";
import React, { useEffect } from "react";
import BaseButton from "../buttons/BaseButton";
import { NewPost } from "../../types/types";

interface ConfirmModalProps<T> {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  checkMsg: string;
  cancelTxt: string;
  confirmTxt: string;
  fn?: (arg?: T) => Promise<void> | void;
  fnArgs: T;
}

const ConfirmModal = <T,>({
  setIsOpen,
  checkMsg,
  cancelTxt,
  confirmTxt,
  fn,
  fnArgs,
}: ConfirmModalProps<T>) => {
  useEffect(() => {
    document.body.style.cssText = `
          position: fixed; 
          top: -${window.scrollY}px;
          overflow-y: scroll;
          width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = "";
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-custom-blur z-100"
      onClick={() => {
        setIsOpen(false);
      }}
    >
      <dialog
        open
        className="absolute p-10 text-center -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg top-1/2 left-1/2"
      >
        <h2 className="a11y-hidden">확인창</h2>
        <div>
          <p className="mb-6 text-lg font-custom-bd">{checkMsg}</p>
          <div className="flex gap-4">
            <BaseButton
              isFilled={false}
              txt={cancelTxt}
              fn={() => setIsOpen(false)}
            />
            <BaseButton
              isFilled={true}
              txt={confirmTxt}
              fn={() => {
                if (fn && fnArgs !== undefined) {
                  fn(fnArgs);
                } else if (fn) {
                  fn();
                }
              }}
            />
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ConfirmModal;

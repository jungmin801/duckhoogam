import React from "react";
import Badge from "../Badge";
import styles from "./SideBar.module.css";

const SideBar = () => {
  return (
    <aside className="px-6 py-10 text-center bg-white rounded-xl">
      <h2 className={styles.title}>About Me</h2>
      <img
        src="/asset/image/profile.jpg"
        alt="유저프로필"
        className="inline-block object-cover w-20 h-20 rounded-full"
      />
      <p className="mt-3 mb-2 text-sm text-custom-blue font-extraBold">
        Moonie
      </p>
      <p className="text-sm">자기소개 블라블라</p>
      <h3 className={`${styles.title} mt-10`}>Categories</h3>
      <ul className="flex flex-wrap items-center justify-center gap-2.5">
        <li>
          <Badge txt={"Music"} />
        </li>
        <li>
          <Badge txt={"Sports"} />
        </li>
      </ul>
    </aside>
  );
};

export default SideBar;

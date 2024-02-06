"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "../../utils/supabaseClient";

const Header = () => {
  const [isLogin, setIsLogin] = useState<boolean>();

  supabase.auth.onAuthStateChange((event, session) => {
    if (event === "SIGNED_IN") setIsLogin(true);
    else if (event === "SIGNED_OUT") {
      setIsLogin(false);
      [window.localStorage, window.sessionStorage].forEach((storage) => {
        Object.entries(storage).forEach(([key]) => {
          storage.removeItem(key);
        });
      });
    }
  });

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <header className="bg-white ">
      <div className="flex items-center justify-between py-4 max-width">
        <h1 className="text-lg font-custom-hv">DuckHooGam</h1>
        <ul className="flex gap-4 ">
          <li>
            {isLogin && (
              <Link
                href={"/post/new"}
                className="px-5 py-2 text-white rounded-lg font-custom-bd bg-custom-blue button"
              >
                <Image
                  src={"/asset/image/modify-white.svg"}
                  alt=""
                  width={20}
                  height={20}
                />
                Write
              </Link>
            )}
          </li>
          <li>
            {!isLogin ? (
              <Link href={"/login"} className="px-3 font-custom-bd button">
                <Image
                  src={"/asset/image/icon-login.svg"}
                  alt=""
                  width={20}
                  height={20}
                />
                Login
              </Link>
            ) : (
              <button className="px-3 font-custom-bd button" onClick={signOut}>
                <Image
                  src={"/asset/image/icon-logout.svg"}
                  alt=""
                  width={20}
                  height={20}
                />
                Logout
              </button>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;

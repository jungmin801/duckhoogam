import React from "react";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-white ">
      <div className="flex items-center justify-between py-4 max-width">
        <h1 className="text-lg font-custom-hv">DuckHooGam</h1>
        <ul className="flex gap-4 ">
          <li>
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
          </li>
          <li>
            <button className="px-3 font-custom-bd button">
              <Image
                src="/asset/image/logout.svg"
                alt=""
                width={20}
                height={20}
              />
              Logout
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;

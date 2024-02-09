import Image from "next/image";
import Link from "next/link";
import React from "react";

const SignIn = () => {
  return (
    <Link href={"/login"} className="px-3 font-custom-bd button">
      <Image
        src={"/asset/image/icon-login.svg"}
        alt=""
        width={20}
        height={20}
      />
      Login
    </Link>
  );
};

export default SignIn;

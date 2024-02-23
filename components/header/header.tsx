import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import SignOut from "../auth/signOut/signOut";
import SignIn from "../auth/signIn/signIn";

const Header = async () => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({
    cookies: () => cookieStore,
  });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="bg-white ">
      <div className="flex items-center justify-between py-4 max-width">
        <h1 className="text-lg font-custom-hv">DuckHooGam</h1>
        <ul className="flex gap-4 ">
          <li>
            {user?.id && (
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
          <li>{!user?.id ? <SignIn /> : <SignOut />}</li>
        </ul>
      </div>
    </header>
  );
};

export default Header;

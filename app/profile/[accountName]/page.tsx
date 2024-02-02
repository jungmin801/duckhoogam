import React from "react";
import ProfileUploadForm from "../../../components/profile/ProfileUploadForm";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { AccountName } from "../../../types/types";

const Profile = async ({ params }: { params: AccountName }) => {
  const accountName = params.accountName;
  const cookieStore = cookies();
  const supabase = createServerComponentClient({
    cookies: () => cookieStore,
  });
  const { data: categories, error } = await supabase
    .from("categories")
    .select("*");

  return (
    <main className="flex items-center max-width h-svh">
      <div className="relative w-1/2 max-w-full p-20 m-auto bg-white min-h-[500px] shadow-xl">
        <h2 className="mb-10 text-2xl text-center font-custom-hv">
          프로필 설정
        </h2>
        <ProfileUploadForm categories={categories} accountName={accountName} />
      </div>
    </main>
  );
};

export default Profile;

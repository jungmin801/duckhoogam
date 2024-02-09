import React from "react";
import Badge from "../common/Badge";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Profile } from "../../types/types";

interface ProfileProps {
  profile: Profile;
}

const SideBar = async ({ profile }: ProfileProps) => {
  const ImgBaseURL = process.env.NEXT_PUBLIC_IMAGE_BASEURL;
  const cookieStore = cookies();
  const supabase = createServerComponentClient({
    cookies: () => cookieStore,
  });

  const validCategories = profile.categories.filter((id) => id !== null);

  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .in("id", validCategories);

  return (
    <aside className="h-fit px-6 pt-10 pb-20 text-center bg-white rounded-xl flex-shrink-0 basis-[calc((100%-2.4rem*3)/4)]">
      <h2 className="mb-5 text-xs tracking-widest underline uppercase font-custom-bd">
        About Me
      </h2>
      <img
        src={ImgBaseURL + profile.image}
        alt="유저프로필"
        className="inline-block object-cover w-20 h-20 rounded-full"
      />
      <p className="mt-3 mb-2 text-sm text-custom-blue font-custom-hv">
        {profile.userName}
      </p>
      <p className="px-1 text-sm">{profile.intro}</p>
      <h3 className="mt-10 mb-5 text-xs tracking-widest underline uppercase font-custom-bd">
        Categories
      </h3>
      <ul className="flex flex-wrap items-center justify-center gap-2.5">
        {categories?.map((category) => {
          return (
            <li key={category.id}>
              <Badge txt={category.name} />
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default SideBar;

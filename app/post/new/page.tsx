import React from "react";
import Banner from "../../../components/common/Banner";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import NewPostForm from "../../../components/post/new/NewPostForm";

const NewPost = async () => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({
    cookies: () => cookieStore,
  });
  const { data: categories } = await supabase.from("categories").select("*");

  return (
    <>
      <Banner type={"newPost"} />
      <main>
        <div className="max-width">
          <NewPostForm categories={categories} />
        </div>
      </main>
    </>
  );
};

export default NewPost;

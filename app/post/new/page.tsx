import React from "react";
import Banner from "../../../components/common/Banner";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import NewPostForm from "../../../components/post/new/NewPostForm";

const NewPost = async ({ searchParams }) => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({
    cookies: () => cookieStore,
  });
  const { data: categories } = await supabase.from("categories").select("*");
  let postData;

  if (searchParams.id) {
    const { data } = await supabase.rpc("get_post_by_id", {
      _post_id: searchParams.id,
    });

    const { data: categoryId } = await supabase
      .from("categories")
      .select("id")
      .in("name", data[0].categoryNames);

    const cateArr = categoryId?.map((el) => el.id);
    data[0].categoryNames = cateArr;

    postData = data[0];
  }

  return (
    <>
      <Banner type={"newPost"} />
      <main>
        <div className="max-width">
          <NewPostForm categories={categories} postData={postData} />
        </div>
      </main>
    </>
  );
};

export default NewPost;

import React from "react";
import Banner from "../../../components/common/Banner";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { PostId } from "../../../types/types";
import { NextPage } from "next";
import {
  PostContents,
  NoPostContent,
} from "../../../components/post/content/PostContent";

export const validate = 0;
export const dynamic = "force-dynamic";

interface Props {
  params: PostId;
}

const DetailPost: NextPage<Props> = async ({ params }) => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({
    cookies: () => cookieStore,
  });

  const { data, error } = await supabase.rpc("get_post_by_id", {
    _post_id: params.postId,
  });

  const { data: user } = await supabase.auth.getUser();

  const userId = user.user.id;

  if (error) {
    console.error(error.message);
  }

  return (
    <>
      <Banner type={"detailPost"} />
      <div>
        <div className="max-width">
          <section className="bg-white w-[57rem] max-w-full mt-[-18rem] ml-72 p-20 relative rounded-2xl ">
            {data && data.length > 0 ? (
              <PostContents data={data} userId={userId} />
            ) : (
              <NoPostContent />
            )}
          </section>
        </div>
      </div>
    </>
  );
};

export default DetailPost;

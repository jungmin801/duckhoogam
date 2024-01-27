import React from "react";
import AuthorInfo from "../../../components/common/AuthorInfo";
import Badge from "../../../components/common/Badge";
import BackButton from "../../../components/buttons/BackButton";
import IconButton from "../../../components/buttons/IconButton";
import LikeButton from "../../../components/buttons/LikeButton";
import Banner from "../../../components/common/Banner";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Post, PostId } from "../../../types/types";
import { formateDate } from "../../../utils/formatDate";
import { NextPage } from "next";

interface Props {
  params: PostId;
}

interface PostList {
  data: Post[];
}

const PostContents = ({ data }: PostList) => {
  const postData = data[0];
  const formattedDate = formateDate(postData.created_at);

  return (
    <div className="w-full max-w-full ">
      <div className="py-5">
        <AuthorInfo author={postData.userName} createdAt={formattedDate} />
      </div>
      <ul className="mt-5 mb-2.5 max-h-14 flex flex-wrap gap-1">
        {postData.category.map((item: string, index: number) => (
          <li key={index}>
            <Badge txt={item} />
          </li>
        ))}
      </ul>
      <div className="flex items-end justify-between gap-2 mb-4">
        <h2 className="text-[2rem] font-bold">{postData.title}</h2>
        <LikeButton />
      </div>
      <hr className="my-8" />
      <div>
        <p>{postData.content}</p>
      </div>
      <div className="absolute left-0 top-20">
        <BackButton />
      </div>
      <div className="absolute flex gap-2 top-[5.6rem] right-20">
        <IconButton type={"modify"} />
        <IconButton type={"delete"} />
      </div>
    </div>
  );
};

const NoPostContent = () => {
  return <p>게시글이 없습니다.</p>;
};

const DetailPost: NextPage<Props> = async ({ params }) => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({
    cookies: () => cookieStore,
  });

  const { data } = await supabase
    .from("post")
    .select("*")
    .eq("id", params.postId);

  return (
    <>
      <Banner type={"detailPost"} />
      <div>
        <div className="max-width">
          <section className="bg-white w-[57rem] max-w-full mt-[-18rem] ml-72 p-20 relative rounded-2xl ">
            {data && data.length > 0 ? (
              <PostContents data={data} />
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

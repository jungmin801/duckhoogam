import React from "react";
import { Post } from "../../../types/types";
import { formateDate } from "../../../utils/formatDate";
import AuthorInfo from "../../common/AuthorInfo";
import Badge from "../../common/Badge";
import LikeButton from "../../buttons/LikeButton";
import BackButton from "../../buttons/BackButton";
import IconButton from "../../buttons/IconButton";

interface PostList {
  data: Post[];
}

export const PostContents = ({ data }: PostList) => {
  const postData = data[0];
  const formattedDate = formateDate(postData.createdAt);

  return (
    <div className="w-full max-w-full">
      <div className="py-5">
        <AuthorInfo
          author={postData.userName}
          createdAt={formattedDate}
          profileImage={postData.profileImage}
        />
      </div>
      <ul className="mt-5 mb-2.5 max-h-14 flex flex-wrap gap-1">
        {postData.categoryNames.map((item: string, index: number) => (
          <li key={index}>
            <Badge txt={item} />
          </li>
        ))}
      </ul>
      <div className="flex items-end justify-between gap-2 mb-4">
        <h2 className="text-[2rem] font-custom-bd">{postData.title}</h2>
        <LikeButton />
      </div>
      <hr className="my-8" />
      <div dangerouslySetInnerHTML={{ __html: postData.content }}></div>
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

export const NoPostContent = () => {
  return <p>게시글이 없습니다.</p>;
};

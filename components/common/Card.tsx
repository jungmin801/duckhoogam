import React from "react";
import Badge from "./Badge";
import AuthorInfo from "./AuthorInfo";
import { Post } from "../../types/types";
import { formateDate } from "../../utils/formatDate";

const Card = (post: Post) => {
  const formattedDate = formateDate(post.created_at);
  const noImage = "https://picsum.photos/300";

  return (
    <article className="overflow-hidden bg-white rounded-xl">
      <div className="overflow-hidden max-h-52">
        <img
          src={post.image ? post.image : noImage}
          alt=""
          className="object-cover duration-200 ease-in w-100 rounded-t-xl hover:scale-110 "
        />
      </div>
      <div className="px-6 pt-4 pb-6">
        <ul className="flex flex-wrap gap-1">
          {post.category.map((item, index) => (
            <li key={index}>
              <Badge txt={item} />
            </li>
          ))}
        </ul>
        <h3 className="max-h-[calc(1.125rem*1.4*2)] my-2.5 text-lg font-custom-bd shorten2">
          {post.title}
        </h3>
        <AuthorInfo
          author={post.userName}
          createdAt={formattedDate}
          profileImage={post.profileimage}
        />
        <p className="h-[calc(0.875rem*1.4*3)] mt-4 text-sm shorten3 text-custom-gray-500">
          {post.content.replace(/(<([^>]+)>)/gi, "")}
        </p>
      </div>
    </article>
  );
};

export default Card;

import React from "react";
import Badge from "./Badge";
import AuthorInfo from "./AuthorInfo";
import { Post } from "../../types/types";

const Card = (post: Post) => {
  const createdDate = new Date(post.created_at);
  const year = createdDate.getFullYear();
  const month = (createdDate.getMonth() + 1).toString().padStart(2, "0");
  const date = createdDate.getDate().toString().padStart(2, "0");

  return (
    <article className="overflow-hidden bg-white rounded-xl">
      <div className="overflow-hidden max-h-54">
        <img
          src={post.image}
          alt=""
          className="object-cover transition-transform rounded-t-xl hover:scale-110 "
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
        <h3 className="h-[calc(1.125rem*1.4*2)] my-2.5 text-lg font-bold shorten2">
          {post.title}
        </h3>
        <AuthorInfo
          author={post.userName}
          createdAt={`${year}.${month}.${date}`}
        />
        <p className="h-[calc(0.875rem*1.4*3)] mt-4 text-sm shorten3 text-custom-gray-500">
          {post.content}
        </p>
      </div>
    </article>
  );
};

export default Card;

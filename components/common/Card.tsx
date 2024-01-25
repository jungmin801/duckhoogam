import React from "react";
import Badge from "./Badge";
import AuthorInfo from "./AuthorInfo";

const Card = (post) => {
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
        <Badge txt="Music" />
        <h3 className="my-3 font-bold shorten2">{post.title}</h3>
        <AuthorInfo
          author={post.userName}
          createdAt={`${year}.${month}.${date}`}
        />
        <p className="mt-4 shorten3 text-custom-gray-500">{post.content}</p>
      </div>
    </article>
  );
};

export default Card;

import React from "react";
import Badge from "./Badge";
import AuthorInfo from "./AuthorInfo";
import Image from "next/image";

const Card = () => {
  return (
    <article className="bg-white w-96 rounded-xl">
      <Image
        src="/asset/image/bingbong.jpg"
        alt=""
        layout="responsive"
        width={100}
        height={50}
        className="rounded-t-xl"
      />
      <div className="px-6 pt-4 pb-6">
        <Badge txt="Music" />
        <h3 className="my-3 font-bold shorten2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum,
          corrupti! Repudiandae, sit accusamus! Perferendis, nam eligendi. Vel,
          voluptate autem iure similique saepe, ipsum, laborum ut error soluta
          eos corporis temporibus?
        </h3>
        <AuthorInfo author="Moonie" createdAt="2024.01.22" />
        <p className="mt-4 shorten3 text-custom-gray-500">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
          corporis praesentium consequatur saepe? Beatae eius vitae ipsa maiores
          pariatur libero possimus, minus odit fuga deleniti ratione natus
          laboriosam rem dicta.
        </p>
      </div>
    </article>
  );
};

export default Card;

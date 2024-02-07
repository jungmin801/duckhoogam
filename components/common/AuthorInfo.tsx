import React from "react";
import Image from "next/image";

const AuthorInfo = ({
  author,
  createdAt,
  profileImage,
}: {
  author: string;
  createdAt: string;
  profileImage: string;
}) => {
  const ImgBaseURL = process.env.NEXT_PUBLIC_IMAGE_BASEURL;
  return (
    <div className="flex items-center gap-4 text-sm text-custom-gray-500">
      <div className="flex items-center gap-1.5">
        <img
          src={ImgBaseURL + profileImage}
          alt=""
          className="object-cover w-8 h-8 rounded-full aspect-square aspect-auto"
        />
        {author}
      </div>
      <div className="flex items-center before:content-'' before:block before:w-px before:h-3 before:mr-4 before:bg-custom-gray-600">
        {createdAt}
      </div>
    </div>
  );
};

export default AuthorInfo;

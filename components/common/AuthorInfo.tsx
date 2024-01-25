import React from "react";
import Image from "next/image";

const AuthorInfo = ({
  author,
  createdAt,
}: {
  author: string;
  createdAt: string;
}) => {
  return (
    <div className="flex items-center gap-4 text-sm text-custom-gray-500">
      <div className="flex items-center gap-1.5">
        <Image
          src={"/asset/image/profile.jpg"}
          alt=""
          width={30}
          height={30}
          className="aspect-square object-cover rounded-full"
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

import React from "react";
import Card from "../common/Card";
import SideBar from "../sideBar/SideBar";
import Link from "next/link";
import { Post } from "../../types/types";
interface PostProps {
  postData: Post[];
}

const HomePage = ({ postData }: PostProps) => {
  return (
    <>
      <SideBar />
      <ul className="grid grid-cols-3 gap-6">
        {postData.map((post) => (
          <li key={post.id}>
            <Link href={`/post/${post.id}`}>
              <Card {...post} />
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default HomePage;

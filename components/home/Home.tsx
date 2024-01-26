import React from "react";
import Card from "../common/Card";
import SideBar from "../sideBar/SideBar";
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
            <Card {...post} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default HomePage;

import React from "react";
import Card from "../common/Card";

const HomePage = ({ postData }) => {
  return (
    <ul className="grid grid-cols-3 gap-4 bg-custom-gray-100">
      {postData.map((post) => (
        <li key={post.id}>
          <Card {...post} />
        </li>
      ))}
    </ul>
  );
};

export default HomePage;

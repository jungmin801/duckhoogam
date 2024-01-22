import React from "react";

const Badge = ({ txt }: { txt: string }) => {
  return (
    <div className="w-16 px-2 py-1 rounded-full text-center text-custom-gray-600 bg-custom-gray-200 ">
      {txt}
    </div>
  );
};

export default Badge;

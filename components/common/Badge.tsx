import React from "react";

const Badge = ({ txt }: { txt: string }) => {
  return (
    <div className="w-16 px-2 py-1 text-xs text-center rounded-full text-custom-gray-600 bg-custom-gray-200 ">
      {txt}
    </div>
  );
};

export default Badge;

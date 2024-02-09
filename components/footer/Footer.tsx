import React from "react";
import TopButton from "../buttons/TopButton";

const Footer = () => {
  return (
    <footer className="mt-24 bg-white">
      <div className="relative flex items-center justify-center h-20 max-width">
        <h2 className="text-custom-gray-600">© Moon Jung Min</h2>
        <TopButton />
      </div>
    </footer>
  );
};

export default Footer;

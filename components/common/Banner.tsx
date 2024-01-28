import React from "react";

const Banner = ({ type }: { type: string }) => {
  const dateObj = new Date();
  const month = dateObj.toLocaleDateString("en-US", {
    month: "short",
  });
  const day = dateObj.toLocaleDateString("en-US", {
    day: "numeric",
  });
  const weekday = dateObj.toLocaleDateString("en-US", {
    weekday: "long",
  });

  const DetailPostContent = () => {
    return (
      <p className="relative pl-10 text-5xl leading-tight font-extraBold">
        {month}
        <em className="text-[2em] block mb-[-0.15em]">{day}</em>
        {weekday}
      </p>
    );
  };

  const MainContent = () => {
    return (
      <>
        <p className="relative text-center py-2.5 tracking-widest border-y border-solid border-white">
          나만의 덕질 일기
        </p>
        <p className="relative my-4 text-6xl text-center font-extraBold">
          덕후감
        </p>
        <p className="relative px-2 text-xs break-all">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste
          nesciunt dicta facilis cum magni, aperiam debitis asperiores
          accusantium. Alias eos temporibus culpa ex omnis, illum saepe repellat
          impedit. Debitis, enim.
        </p>
      </>
    );
  };

  return (
    <div className="h-[27rem] bg-[url('/asset/image/banner.jpg')] bg-no-repeat bg-cover bg-center relative mb-[-7rem]">
      <div className="max-width">
        <div className="w-[17.5rem] text-white pt-[70px] pb-[145px] before:content-[''] before:absolute before:top-0 before:left-0 before:w-[calc((100%-1224px)/2+27.5rem)] before:h-full before:bg-[rgba(40,48,63,0.5)]">
          {type === "detailPost" ? (
            <DetailPostContent />
          ) : type === "home" ? (
            <MainContent />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Banner;

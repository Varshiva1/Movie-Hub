import React from "react";

function Banner() {
  return (
    <div
      className="h-[20vh] md:h-[50vh] bg center flex items-end"
      style={{
        backgroundImage: `url(${require("../images/banner.jpg")})`,
      }}
    >
      <div className="text-xl text-gray text-opacity-70 text- italic md:text-3xl bg-blue-900 bg-opacity-50 p-4 text-white text-center w-full">
        Movies hub
      </div>
    </div>
  );
}

export default Banner;

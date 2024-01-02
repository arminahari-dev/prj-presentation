import React from "react";
import sticker3 from "../assets/imgs/sticker3.png";
import "animate.css";
function Preload({ openSidepanel }) {
  return (
    <div className="preload flex justify-center items-center flex-col-reverse gap-2">
      {openSidepanel ? (
        <span className="text-t-white min-[2560px]:text-[1.75rem] min-[1440px]:text-[1.25rem]  min-[1024px]:text-[1rem] font-semibold">
          Choose a season to have a better life
        </span>
      ) : (
        <span className="text-white min-[2560px]:text-[1.75rem] min-[1440px]:text-[1.25rem]  min-[1024px]:text-[1rem] font-semibold">open sidepanel</span>
      )}
      <img className="w-72" src={sticker3} alt="sticker3" />
    </div>
  );
}

export default Preload;

import React, { useEffect } from "react";
import { useState } from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import { XCircleIcon } from "@heroicons/react/24/solid";
import toast from "react-hot-toast";

function CharacterInfo({
  CharacterInfoo,
  handleAddFavoriteCharacter,
  handleAddFavoriteCharacterAndNotify,
}) {
  const [Ch_appears_Episode, setCh_appears_Episode] = useState([]);
  useEffect(() => {
    async function fetchCh_appears_Episode() {
      try {
        const Ch_appears_EpisodeData = CharacterInfoo.episode;
        const episdoeDataArray = await Promise.all(
          Ch_appears_EpisodeData.map(async (ch) => {
            const response = await fetch(ch);
            if (!response.ok) {
              throw new Error(`Failed to fetch characterinfo data from ${ch}`);
            }
            return response.json();
          })
        );
        setCh_appears_Episode(episdoeDataArray);
      } catch (error) {
        toast.error(error.message);
      }
    }
    fetchCh_appears_Episode();
  }, [CharacterInfoo.episode]);
  return (
    <div className="CharacterInfo">
      <div
        onClick={() => handleAddFavoriteCharacter()}
        className="modal_backdrop fixed top-0 left-0 w-full h-full bg-gray-600 bg-opacity-70 flex items-center justify-center z-10"
      ></div>
      <div className="modal_content flex flex-col gap-4 overflow-y-auto fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#C3C3C3]  p-14 mobile_l:p-3  min-[640px]:rounded-xl  xs:p-3 z-20      min-[2560px]:h-[40rem] min-[1440px]:h-[40rem] lg:w-h-[40rem] tablet:h-[40rem] mobile_l:h-full xs:h-ful vxs:h-full        rounded-xl min-[2560px]:w-[77rem] min-[1440px]:w-[66rem] lg:w-[55rem] tablet:w-[44rem] mobile_l:w-full xs:w-full vxs:w-full">
        <div className="flex justify-center items-center flex-col gap-3">
          <div className="min-[2560px]:w-[65rem]  min-[1440px]:w-[54rem] min-[1024px]:w-[48rem] tablet:w-[37rem] sm:w-[37rem] min-[640px]:w-[37rem] mobile_l:w-[24rem] xs:w-[20rem] vxs:w-[19rem] flex justify-start">
            <button onClick={() => handleAddFavoriteCharacter()}>
              <XCircleIcon className="w-12" />
            </button>
          </div>
          <div className="flex flex-row justify-center items-center border bg-[#4C4B63] p-3 px-14 rounded-lg min-[2560px]:w-[65rem]  min-[1440px]:w-[54rem] min-[1024px]:w-[48rem] tablet:w-[37rem] sm:w-[37rem] min-[640px]:w-[37rem] mobile_l:w-[24rem] xs:w-[20rem] vxs:w-[19rem]         min-[2560px]:gap-[15.75rem]  min-[1440px]:gap-[11.75rem] min-[1024px]:gap-[8.75rem] tablet:gap-[3.75rem] sm:gap-[3.75rem] min-[640px]:gap-[3.75rem] mobile_l:gap-[6.75rem] xs:gap-[2.75rem] vxs:gap-[1.75rem]">
            <div className="p-3 desktop_4k:flex desktop_1440:flex desktop_1024:flex tablet:flex sm:flex mobile_l:hidden  xs:hidden vxs:hidden rounded-2xl">
              <img
                className="w-[10.5rem] rounded-2xl"
                src={CharacterInfoo.image}
                alt=""
              />
            </div>
            <div className="flex flex-row gap-3">
              <div className="flex items-center justify-center gap-12 text-center text-white">
                <div className="flex justify-center items-center flex-col gap-3">
                  <span className="font-bold">{CharacterInfoo.name}</span>
                  <div>
                    <span>
                      {CharacterInfoo.status}&nbsp;|&nbsp;
                      {CharacterInfoo.species}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <button
                onClick={() =>
                  handleAddFavoriteCharacterAndNotify(CharacterInfoo)
                }
                className="flex justify-center items-center w-36 mobile_l:text-xs bg-[#5386E4] gap-3 p-3 rounded-xl"
              >
                <span className="text-white">add to fav</span>
                <StarIcon className="w-5 text-white" />
              </button>
            </div>
          </div>
          <div className="min-[2560px]:w-[65rem]  min-[1440px]:w-[54rem] min-[1024px]:w-[48rem] tablet:w-[37rem] sm:w-[37rem] min-[640px]:w-[37rem] mobile_l:w-[24rem] xs:w-[20rem] vxs:w-[19rem] flex justify-start">
            <span className="text-white">
              <b> {CharacterInfoo.name} </b>appears in these Episodes :
            </span>
          </div>
          <div className="rounded-lg min-[2560px]:w-[65rem]  min-[1440px]:w-[54rem] min-[1024px]:w-[48rem] tablet:w-[37rem] sm:w-[37rem] min-[640px]:w-[37rem] mobile_l:w-[24rem] xs:w-[20rem] vxs:w-[19rem]">
            <div className="desktop_4k:grid-cols-4  desktop_1440:grid-cols-4 desktop_1024:grid-cols-4 tablet:grid-cols-3 sm:grid-cols-3  min-[640px]:grid-cols-3 mobile_l:grid-cols-3 xs:grid-cols-2 vxs:grid-cols-1 grid  justify-items-center gap-y-[1.5rem] gap-x-[2rem] p-5 border border-gray-600  rounded-lg">
              {Ch_appears_Episode.map((ep) => (
                <Test ep={ep} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CharacterInfo;

function Test({ ep }) {
  return (
    <div className="p-4 border bg-[#4C4B63] text-white border-[#4C4B63]  desktop_4k:w-44  desktop_1440:w-44 desktop_1024:w-44 tablet:w-44 sm:w-44 min-[640px]:w-44 mobile_l:w-28 xs:w-36 vxs:w-60 flex flex-col items-center justify-center rounded-2xl">
      <span className="text-center font-bold">{ep.name.slice(0, 20)}...</span>
      <span>{ep.episode}</span>
    </div>
  );
}

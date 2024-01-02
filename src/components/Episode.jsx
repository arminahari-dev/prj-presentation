import React, { useEffect, useState } from "react";
import "animate.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

function Episode({
  episode,
  Opencharacterpage,
  isLoadEpisodes,
  expandsidepanel,
}) {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState("");

  useEffect(() => {
    async function fetchCharacterData() {
      try {
        const characterUrls = episode.characters;
        const characterDataArray = await Promise.all(
          characterUrls.map(async (ch) => {
            const response = await fetch(ch);
            if (!response.ok) {
              throw new Error(`Failed to fetch character data from ${ch}`);
            }
            return response.json();
          })
        );
        setCharacters(characterDataArray);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }
    fetchCharacterData();
  }, [episode.characters]);

  useEffect(() => {
    // Update selectedSeason when currentSeasons changes
    const seasonNumber = Object.keys(isLoadEpisodes).find(
      (season) => isLoadEpisodes[season]
    );
    setSelectedSeason(seasonNumber || "");
  }, [episode.characters]);

  return (
    <div className="episode max-sm:px-0 p-8 flex flex-col justify-center items-center bg-[#C3C3C3] border-[#4C4B63] border desktop_4k:w-[98%] desktop_1440:w-[97%] desktop_1024:w-[96%] tablet:w-[96%] sm:w-[96%] max-sm:w-[100%] sm:h-[95%] max-sm:rounded-none rounded-lg shadow-2xl">
      {loading ? (
        <div className="loader flex h-[90%] items-center justify-center font-semibold text-xl">
          <p>
            Loading character data &nbsp;
            <FontAwesomeIcon icon={faSpinner} spinPulse />
          </p>
        </div>
      ) : error ? (
        <div className="text-center">
          <p className="text-[#4C4B63]">
            Error loading character data: {error.message}
          </p>
        </div>
      ) : (
        <div className="characters h-[100%] overflow-y-auto w-[95%]">
          <div
            className={`info desktop_4k:text-[1.75rem] desktop_1440:text-[1.25rem]  desktop_1024:text-[1rem]  tablet:text-[13px]  ${
              expandsidepanel ? "sm:text-[12px]" : "sm:text-[15px]"
            }   px-4 text-[#4C4B63]`}
          >
            <div className="flex flex-row items-center">
              <div className="text-left">
                <div>
                  {selectedSeason && (
                    <span>
                      Season&nbsp;
                      <b className="underline">
                        {selectedSeason.toString().padStart(2, "0")}
                      </b>
                    </span>
                  )}
                </div>
                <div>
                  <span>Episode</span>
                  <span>{episode.id.toString().padStart(2, "0")}</span>
                  <span>:</span>
                  &nbsp;
                  <span className="font-extrabold">{episode.name}</span>
                </div>
                <div>
                  <span>
                    Release Date: <b>{episode.air_date}</b>
                  </span>
                </div>
              </div>
            </div>
            <div className="pt-5">
              <h2 className="pb-3">
                <span className="underline">Characters</span> in this episode:
              </h2>
            </div>
          </div>
          <div className="grid desktop_4k:grid-cols-6 desktop_1440:grid-cols-5 desktop_1024:grid-cols-4 tablet:grid-cols-3 sm:grid-cols-2  max-sm:grid-cols-2  gap-[1.7rem] justify-items-center max-h-[34.5rem] p-4">
            {characters.map((ch) => (
              <Charatcter ch_info={ch} Opencharacterpage={Opencharacterpage} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Episode;

function Charatcter({ ch_info, Opencharacterpage }) {
  return (
    <div
      onClick={() => Opencharacterpage(ch_info)}
      className="bg-[#4C4B63] shadow-2xl cursor-pointer p-4 min-[2560px]:w-[100%] min-[1440px]:w-[100%] lg:w-[110%] tablet:w-[110%] flex flex-col items-center justify-center gap-3 text-yellow-50 rounded-md"
    >
      {ch_info.image ? (
        <img
          className="rounded-full  desktop_4k:w-52 desktop_1440:w-40  desktop_1024:w-32"
          src={ch_info.image}
          alt=""
        />
      ) : (
        "cant load img"
      )}
      <span className="min-[2560px]:text-2xl min-[1440px]:text-xl lg:text-[13px] tablet:text-[13px] sm:text-[11px] max-sm:text-[11px] text-center  font-bold">
        {ch_info.name}
      </span>
      <div className="text-center">
        <span className="min-[2560px]:text-lg  min-[1440px]:text-sm  lg:text-[11px] tablet:text-[11px] sm:text-[9px] max-sm:text-[11px] font-semibold">
          {ch_info.status}&nbsp;|&nbsp;{ch_info.species}
        </span>
      </div>
    </div>
  );
}

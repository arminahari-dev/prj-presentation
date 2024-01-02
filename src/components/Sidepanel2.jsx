import React, { useEffect, useState } from "react";
import "animate.css";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  FilmIcon,
} from "@heroicons/react/24/solid";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function SeasonButton({
  seasonNumber,
  seasonName,
  isSeasonOpen,
  toggleSeasonHandler,
}) {
  return (
    <Link
      to={`?season=${seasonNumber}`}
      className="flex items-center flex-row-reverse text-lg text-gray-400 hover:text-white"
      onClick={() => toggleSeasonHandler(seasonNumber)}
    >
      <div className={`Season0${seasonNumber} flex gap-3`}>
        <FilmIcon className="w-4" />
        <span>{seasonName}</span>
        {isSeasonOpen ? (
          <ChevronDownIcon className="w-[1.5rem]" />
        ) : (
          <ChevronRightIcon className="w-[1.5rem]" />
        )}
      </div>
    </Link>
  );
}

function SeasonList({
  seasons,
  isOpenSeason,
  isLoadEpisodes,
  toggleSeasonHandler,
  episodeData,
  handleEpisodeClick,
  activeEpisode,
}) {
  return (
    <div className="flex flex-col gap-5">
      {seasons.map((seasonNumber, index) => (
        <div
          key={seasonNumber}
          className={`season${seasonNumber} flex justify-center flex-col items-center w-60`}
        >
          <SeasonButton
            seasonNumber={seasonNumber}
            seasonName={`Season0${seasonNumber}`}
            isSeasonOpen={isOpenSeason[seasonNumber]}
            toggleSeasonHandler={toggleSeasonHandler}
          />
          {isLoadEpisodes[seasonNumber] ? (
            <div className="flex flex-col leading-[2.5rem] ml-8">
              {episodeData[seasonNumber].map((episode) => (
                <Link
                  to={`?season=${seasonNumber}&episode=${episode.id}`}
                  key={episode.id}
                  className={`text-gray-600  hover:text-white  ${
                    activeEpisode && activeEpisode.id === episode.id
                      ? "text-white"
                      : ""
                  } `}
                  onClick={() => handleEpisodeClick(seasonNumber, episode.id)}
                >
                  <li>
                    <span>Episode</span>
                    <span>{episode.id.toString().padStart(2, "0")}</span>
                  </li>
                </Link>
              ))}
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}

function Sidebar({
  test10,
  expandsidepanel,
  setExpandSidePanel,
  isLoadEpisodes,
  setIsLoadEpisodes,
  setEpisode,
  setOpenEpisode,
  isOpenSeason,
  setIsOpenSeason,
  activeEpisode,
  setActiveEpisode,
  showEpisodeListMobile,
  setShowEpisodeListMobile,
}) {
  const [episodeData, setEpisodeData] = useState({ 1: [], 2: [], 3: [] });
  function test1() {
    setExpandSidePanel(true);
    toggleSeasonHandler(1);
  }

  function test2() {
    setExpandSidePanel(true);
    toggleSeasonHandler(2);
  }

  function test3() {
    setExpandSidePanel(true);
    toggleSeasonHandler(3);
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const responses = await Promise.all([
          axios.get("https://rickandmortyapi.com/api/episode"),
          axios.get("https://rickandmortyapi.com/api/episode?page=2"),
          axios.get("https://rickandmortyapi.com/api/episode?page=3"),
        ]);

        if (responses.some((response) => response.status !== 200)) {
          throw new Error();
        }

        const allSeasons = responses.flatMap(
          (response) => response.data.results
        );

        setEpisodeData({
          1: allSeasons.slice(0, 11),
          2: allSeasons.slice(11, 22),
          3: allSeasons.slice(22, 33),
        });
      } catch (error) {
        toast.error(error.message);
      }
    }
    fetchData();
  }, []);

  function toggleSeasonHandler(seasonNumber) {
    for (let i = 1; i <= 3; i++) {
      if (i !== seasonNumber) {
        // Close other seasons and their episodes
        setIsOpenSeason((prev) => ({
          ...prev,
          [i]: false,
        }));
        setIsLoadEpisodes((prev) => ({
          ...prev,
          [i]: false,
        }));
      } else {
        // open toggole season and their episode
        setIsOpenSeason((prev) => ({
          ...prev,
          [i]: !prev[i],
        }));
        setIsLoadEpisodes((prev) => ({
          ...prev,
          [i]: !prev[i],
        }));
      }
    }
  }

  function handleEpisodeClick(seasonNumber, episodeId) {
    let foundEpisode = episodeData[seasonNumber].find(
      (episode) => episode.id === episodeId
    );
    if (foundEpisode) {
      setEpisode(foundEpisode);
      setOpenEpisode(true);
      setActiveEpisode(foundEpisode);
    }
    if (window.innerWidth <= 641) {
      setShowEpisodeListMobile(false);
    }
  }

  return (
    <div
      className={` ${
        showEpisodeListMobile ? "flex items-baseline" : "max-sm:hidden"
      }  flex-col items-center py-8 bg-white dark:bg-gray-900 dark:border-[#4C4B63] border-l border-r border-b`}
    >
      <div
        className={`transition-width duration-300 relative max-sm:hidden ${
          expandsidepanel
            ? "left-[13.3rem] bottom-[14px]"
            : "left-[6.1rem] bottom-[14px]"
        } `}
      >
        <a
          onClick={(e) => {
            e.preventDefault();
            test10();
          }}
          href="#"
          className="text-gray-500 transition-colors duration-200 rotate-180 dark:text-gray-400 rtl:rotate-0 hover:text-white dark:hover:text-white"
        >
          {expandsidepanel ? (
            <ArrowRightCircleIcon className="w-8" />
          ) : (
            <ArrowLeftCircleIcon className="w-8" />
          )}
        </a>
      </div>
      <div className={`${expandsidepanel ? "" : "pr-6"}`}>
        {expandsidepanel ? (
          <SeasonList
            seasons={[1, 2, 3]}
            isOpenSeason={isOpenSeason}
            isLoadEpisodes={isLoadEpisodes}
            toggleSeasonHandler={toggleSeasonHandler}
            episodeData={episodeData}
            handleEpisodeClick={handleEpisodeClick}
            activeEpisode={activeEpisode}
          />
        ) : (
          <div className="flex flex-col gap-4 text-gray-400">
            <button
              className="flex flex-row-reverse items-center gap-3 dark:hover:text-white text-lg"
              onClick={test1}
            >
              <span>S-01</span>
              <FilmIcon className="w-4" />
            </button>
            <button
              className="flex flex-row-reverse gap-3 items-center dark:hover:text-white text-lg"
              onClick={test2}
            >
              <span>S-02</span>
              <FilmIcon className="w-4" />
            </button>
            <button
              className="flex flex-row-reverse gap-3 items-center dark:hover:text-white text-lg"
              onClick={test3}
            >
              <span>S-03</span>
              <FilmIcon className="w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;

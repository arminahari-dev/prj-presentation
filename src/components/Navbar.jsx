import reactLogo from "../assets/imgs/logo.png";
import "animate.css";
import { StarIcon, Bars3Icon, XCircleIcon } from "@heroicons/react/24/solid";
import { NavLink } from "react-router-dom";
function Navbar({
  openFavoriteCharactersModal,
  setOpenEpisode,
  setIsOpenSeason,
  setIsLoadEpisodes,
  setActiveEpisode,
  setOpenSidepanel,
  setShowEpisodeListMobile,
  showEpisodeListMobile,
}) {
  function backtostartpagehandler() {
    setActiveEpisode(null);
    setOpenEpisode(false);
    setIsOpenSeason((prevValue) => ({
      ...prevValue,
      1: false,
      2: false,
      3: false,
    }));
    setIsLoadEpisodes((prevValue) => ({
      ...prevValue,
      1: false,
      2: false,
      3: false,
    }));
  }
  return (
    <div
      className={`navbar h-[10%] dark:bg-gray-900 border-[#4C4B63] border flex justify-between items-center px-4 shadow-2xl`}
    >
      <button className="sm:hidden">
        {showEpisodeListMobile ? (
          <XCircleIcon
            onClick={() => {
              setOpenSidepanel(false);
              setShowEpisodeListMobile(false);
            }}
            className="w-10"
          />
        ) : (
          <Bars3Icon
            onClick={() => {
              setOpenSidepanel(true);
              setShowEpisodeListMobile(true);
            }}
            className="w-10"
          />
        )}
      </button>
      <NavLink to={"/app"} onClick={backtostartpagehandler}>
        <img
          src={reactLogo}
          className="desktop_4k:w-56 desktop_1440:w-40  desktop_1024:w-36  tablet:w-32 sm:w-32  max-[640px]:hidden "
          alt=""
          srcset=""
        />
      </NavLink>
      <button
        onClick={() => openFavoriteCharactersModal()}
        className="text-white flex justify-center items-center gap-3 shadow-2xl bg-[#628fe2] px-8 py-[0.7rem] rounded-full hover:bg-[#74a4fd]  desktop_4k:text-2xl desktop_1440:text-base  desktop_1024:text-xs  tablet:text-xs  mobile_l:text-xs xs:text-xs  vxs:text-xs"
      >
        <span>Favorite list</span>
        <StarIcon className="w-4" />
      </button>
    </div>
  );
}

export default Navbar;

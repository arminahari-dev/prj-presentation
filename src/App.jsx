import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import CharacterInfo from "./components/CharacterInfo";
import "animate.css";
import Episode from "./components/Episode";
import Preload from "./components/Preload";
import FavCharacter from "./components/FavCharacter";
import toast, { Toaster } from "react-hot-toast";
import Sidepanel2 from "./components/Sidepanel2";
import { useNavigate, useSearchParams } from "react-router-dom";

function App() {
  const [openSidepanel, setOpenSidepanel] = useState(true);
  const [expandsidepanel, setExpandSidePanel] = useState(true);
  const [openepisode, setOpenEpisode] = useState(false);
  const [episode, setEpisode] = useState({});
  const [openCharacterInfo, setOpenCharacterInfo] = useState(false);
  const [CharacterInfoo, setCharacterInfoo] = useState({});
  const [favCHaracters, setFavCHaracters] = useState([]);
  const [openFavModal, setOpenFavModal] = useState(false);
  const [isOpenSeason, setIsOpenSeason] = useState({
    1: false,
    2: false,
    3: false,
  });
  const [isLoadEpisodes, setIsLoadEpisodes] = useState({
    1: false,
    2: false,
    3: false,
  });
  const [activeEpisode, setActiveEpisode] = useState(null);
  const [showEpisodeListMobile, setShowEpisodeListMobile] = useState(false);
  const storedData = localStorage.getItem("favitem");
  const favoriteCharacters = storedData ? JSON.parse(storedData) : [];

  const Opencharacterpage = (ch_info) => {
    setOpenCharacterInfo(true);
    setCharacterInfoo(ch_info);
  };

  function handleAddFavoriteCharacter(params) {
    setOpenCharacterInfo(false);
  }

  function handleAddFavoriteCharacterAndNotify(fav_CharacterInfoo) {
    setFavCHaracters((prev) => {
      if (!prev.some((item) => item.id === fav_CharacterInfoo.id)) {
        const updatedFavorites = [...prev, fav_CharacterInfoo];
        localStorage.setItem("favitem", JSON.stringify(updatedFavorites));
        toast.success("Successfully added !");
        return updatedFavorites;
      } else {
        toast("already added !");
      }
      return prev;
    });
  }

  function openFavoriteCharactersModal() {
    setOpenFavModal(true);
  }

  function closeFavoriteCharactersModal() {
    setOpenFavModal(false);
  }

  function handleRemoveFavoriteCharacterAndNotify(id) {
    const fi = favoriteCharacters.filter((ch) => ch.id !== id);
    setFavCHaracters(fi);
    localStorage.setItem("favitem", JSON.stringify(fi));
    toast.success("Successfully deleted !");
  }

  function test10() {
    setExpandSidePanel(!expandsidepanel);
  }

  let [searchParams, setSearchParams] = useSearchParams();
  const param = searchParams.get("season");
  const param2 = searchParams.get("episode");
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (param) {
        searchParams.delete("season");
      }
      if (param2) {
        searchParams.delete("episode");
      }
      setSearchParams(searchParams);
    };
    window.addEventListener("load", handleBeforeUnload);
    return () => {
      window.removeEventListener("load", handleBeforeUnload);
    };
  }, []);

  const window_width = {
    width: window.innerWidth,
  };

  useEffect(() => {
    function name(params) {
      if (window_width.width <= 640) {
        setOpenSidepanel(false);
      }
    }
    window.addEventListener("load", name);
    function resize(params) {
      location.reload();
    }
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("load", name);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const navigate = useNavigate();
  useEffect(() => {
    const handleBackButton = () => {
      setOpenEpisode(false);
      setActiveEpisode(null);
      setIsOpenSeason((prevState) => ({
        ...prevState,
        1: false,
        2: false,
        3: false,
      }));
      setIsLoadEpisodes((prevState) => ({
        ...prevState,
        1: false,
        2: false,
        3: false,
      }));
      setOpenFavModal(false);
      setOpenCharacterInfo(false);
      navigate("/app");
    };
    window.addEventListener("popstate", handleBackButton);
    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, [navigate]);

  return (
    <div className="app h-screen grid overflow-x-hidden">
      <Toaster />
      <div>
        <Navbar
          openFavoriteCharactersModal={openFavoriteCharactersModal}
          setOpenEpisode={setOpenEpisode}
          setIsOpenSeason={setIsOpenSeason}
          setIsLoadEpisodes={setIsLoadEpisodes}
          setActiveEpisode={setActiveEpisode}
          setOpenSidepanel={setOpenSidepanel}
          setShowEpisodeListMobile={setShowEpisodeListMobile}
          showEpisodeListMobile={showEpisodeListMobile}
        />
        <div
          className={`content grid ${
            expandsidepanel
              ? "grid-cols-[230px_minmax(900px,_1fr)] desktop_1440:grid-cols-[230px_minmax(0px,_1fr) desktop_1024:grid-cols-[230px_minmax(0px,_1fr)] tablet:grid-cols-[230px_minmax(0px,_1fr)] sm:grid-cols-[230px_minmax(0px,_1fr)] xs:grid-cols-none vxs:grid-cols-none"
              : "grid-cols-[115px_minmax(900px,_1fr)] tablet:grid-cols-[115px_minmax(0px,_1fr)] sm:grid-cols-[115px_minmax(0px,_1fr)] xs:grid-cols-none vxs:grid-cols-none"
          } 
            openSidepanel ? "" : "grid-cols-none"
          } !h-[90%]  transition-width duration-300`}
        >
          {openSidepanel == true ? (
            <Sidepanel2
              test10={test10}
              expandsidepanel={expandsidepanel}
              setExpandSidePanel={setExpandSidePanel}
              setEpisode={setEpisode}
              setOpenEpisode={setOpenEpisode}
              isOpenSeason={isOpenSeason}
              setIsOpenSeason={setIsOpenSeason}
              isLoadEpisodes={isLoadEpisodes}
              setIsLoadEpisodes={setIsLoadEpisodes}
              activeEpisode={activeEpisode}
              setActiveEpisode={setActiveEpisode}
              setShowEpisodeListMobile={setShowEpisodeListMobile}
              showEpisodeListMobile={showEpisodeListMobile}
            />
          ) : null}
          <div
            className={` ${
              showEpisodeListMobile ? "hidden" : "flex"
            } justify-center items-center`}
          >
            {openepisode == true ? (
              <Episode
                episode={episode}
                Opencharacterpage={Opencharacterpage}
                isLoadEpisodes={isLoadEpisodes}
                expandsidepanel={expandsidepanel}
              />
            ) : (
              <Preload openSidepanel={openSidepanel} />
            )}
          </div>
          {openCharacterInfo ? (
            <CharacterInfo
              CharacterInfoo={CharacterInfoo}
              handleAddFavoriteCharacter={handleAddFavoriteCharacter}
              handleAddFavoriteCharacterAndNotify={
                handleAddFavoriteCharacterAndNotify
              }
            />
          ) : null}
          {openFavModal ? (
            <FavCharacter
              closeFavoriteCharactersModal={closeFavoriteCharactersModal}
              handleRemoveFavoriteCharacterAndNotify={
                handleRemoveFavoriteCharacterAndNotify
              }
              favoriteCharacterss={favoriteCharacters}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default App;

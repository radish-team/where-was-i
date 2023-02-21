import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
// import "./style/addshowsidebar.css";

function AddShowSideBar(props) {
  const [seasonSelect, setSeasonSelectd] = useState("");
  const [episodeSelect, setEpisodeSelected] = useState("");
  const [showInfo, setShowInfo] = useState(false);
  const [seasonsAndEpisodes, setSeasonsAndEpisodes] = useState([]);

  useEffect(() => {
    getShowInfo(props.showSelected.show_id);
  }, [props.showSelected]);

  useEffect(() => {
    if (showInfo) {
      handleSeasonsAndEpisodes();
    }
  }, [showInfo]);

  async function getShowInfo(showId) {
    const data = await fetch(
      `https://api.themoviedb.org/3/tv/${showId}?api_key=22232a34b1256a41ee95dfdb04aa1810`
    ).then((data) => data.json());
    setShowInfo(data);
  }

  function handleSeasonsAndEpisodes() {
    let seasonCounter = 0;
    const countSeasonsAndEpisodes = {};
    showInfo.seasons.map((season) => {
      if (season.name != "Specials") {
        seasonCounter++;
        countSeasonsAndEpisodes[seasonCounter] = season.episode_count;
      }
    });
    setSeasonsAndEpisodes(countSeasonsAndEpisodes);
    console.log(seasonsAndEpisodes);
  }
  async function updateDatabase(e) {
    e.preventDefault();
    const obj = {
      user_id: localStorage.user_id,
      show_id: props.showSelected.show_id,
      name: props.showSelected.name,
      season: seasonSelect,
      episode: episodeSelect,
      url: `https://image.tmdb.org/t/p/original${props.showSelected.image}`,
    };

    await fetch("http://localhost:4000/user/shows", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(obj),
    });
    props.setShowSelected(false);
  }

  function closeButton() {
    props.setShowSelected(false);
  }

  return (
    <div className="addshow-side">
      <div className="images-search-container">
        <img
          src={`https://image.tmdb.org/t/p/original${props.showSelected.image}`}
        />
      </div>
      <div className="form-search-container">
        <FontAwesomeIcon
          icon={faXmarkCircle}
          className="icon-button"
          onClick={closeButton}
        />
        <form id="update-form" onSubmit={updateDatabase}>
          {showInfo && (
            <div className="selectProgress">
              <select
                onChange={(event) => {
                  setSeasonSelectd(event.target.value);
                }}
              >
                <option selected="true" disabled="disabled">
                  Season
                </option>
                {seasonsAndEpisodes &&
                  Object.keys(seasonsAndEpisodes).map((season) => {
                    return <option value={season}>{season}</option>;
                  })}
              </select>
              <select
                onChange={(event) => setEpisodeSelected(event.target.value)}
              >
                {" "}
                <option selected="true" disabled="disabled">
                  Episode
                </option>
                {setSeasonSelectd &&
                  [...Array(seasonsAndEpisodes[seasonSelect])].map((e, i) => {
                    return <option value={i + 1}>{i + 1}</option>;
                  })}
              </select>
            </div>
          )}
          <button type="submit" className="btn">
            Add show!
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddShowSideBar;

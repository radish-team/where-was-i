import { useState, useEffect } from "react";
import Show from "./Show";
import "../styles/Show.css";
import "../styles/Update.css";

function Update({
  progressButton,
  setProgressButton,
  showname,
  login,
  singleShowId,
  progress,
  showImage,
  setDefaultView,
  setCurrentView,
}) {
  const [episodeSelect2, setEpisodeSelect2] = useState("");
  const [seasonSelect2, setSeasonSelect2] = useState("");

  function goBack(e) {
    e.preventDefault();
    setProgressButton(false);
    setDefaultView(true);
  }

  async function updateProgress(e) {
    e.preventDefault();
    const obj = {
      user_id: login,
      show_id: singleShowId,
      showname: showname,
      season: seasonSelect2,
      episode: episodeSelect2,
      url: showImage,
    };

    await fetch("http://localhost:4000/user/shows", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(obj),
    });
    setCurrentView("Homepage");
  }

  return (
    <div className="update">
      <br></br>
      <h3>Update Progress</h3>
      <div className="update-container">
        <form onSubmit={updateProgress}>
          <label>Season</label>
          <input
            type="text"
            name="season"
            value={seasonSelect2}
            pattern="[0-9]+"
            placeholder="Season Number, Ex 1"
            required
            onChange={(event) => setSeasonSelect2(event.target.value)}
          />
          <br></br>
          <label>Episode</label>
          <input
            type="text"
            name="Episode"
            pattern="[0-9]+"
            placeholder="Episode Number, Ex 12"
            required
            value={episodeSelect2}
            onChange={(event) => setEpisodeSelect2(event.target.value)}
          />
          <div className="update-btn-container">
            <button type="submit" className="btn">
              Update
            </button>
            <button onClick={goBack} className="btn">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Update;

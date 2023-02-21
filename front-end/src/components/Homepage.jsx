import { useState, useEffect } from "react";
import "../styles/Homepage.css";
import MoviePoster from "./MoviePoster";

function Homepage({
  login,
  currentView,
  setCurrentView,
  setShowname,
  setProgress,
  setSingleShowId,
  setShowImage,
}) {
  const [showList, setShowList] = useState([]);

  useEffect(() => {
    const getShows = async () => {
      let shows = await fetch(
        `http://localhost:4000/user/shows?user_id=${login}`
      );
      const parsed = await shows.json();
      setShowList(parsed);
    };

    console.log(showList);

    getShows();
  }, []);

  return (
    <div className="homepage">
      <div className="homepage-card-container">
        {showList.map((show, index) => {
          return (
            <MoviePoster
              key={index}
              showname={show.showname}
              season={show.season}
              episode={show.episode}
              singleShowId={show.show_id}
              setShowname={setShowname}
              setCurrentView={setCurrentView}
              setProgress={setProgress}
              setSingleShowId={setSingleShowId}
              setShowImage={setShowImage}
              image={show.image}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Homepage;

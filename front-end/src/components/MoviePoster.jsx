import { faListSquares } from "@fortawesome/free-solid-svg-icons";
import "../styles/movie-poster.css";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

function MoviePoster({
  showname,
  setShowname,
  setCurrentView,
  season,
  episode,
  singleShowId,
  setProgress,
  setSingleShowId,
  setShowImage,
  image,
  personalRank,
}) {
  const newPersonalRank = personalRank === null ? false : true;
  const partialStars = personalRank / 2;
  const totalRank = 5;

  return (
    <div
      className="cards"
      onClick={() => {
        setShowname(showname);
        setProgress([season, episode]);
        setSingleShowId(singleShowId);
        setShowImage(image);
        setCurrentView("SingleShow");
      }}
    >
      <div className="image-home-container">
        <img src={image} alt="tv poster" />
      </div>
      <div className="text-home-container">
        <h3>{showname}</h3>
      </div>
      <div className="personalRank">
        {newPersonalRank ? (
          <Box>
            <h4>Own Ranking : </h4>
            {[...new Array(totalRank)].map((arr, index) => {
              return index < partialStars ? <StarIcon /> : <StarBorderIcon />;
            })}
          </Box>
        ) : (
          <h4>Rate this series! &#9733;</h4>
        )}
      </div>
    </div>
  );
}

export default MoviePoster;

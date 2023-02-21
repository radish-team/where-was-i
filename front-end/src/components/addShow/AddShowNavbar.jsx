import { useEffect, useRef, useState } from "react";

function AddShowNavbar({ setSearchList }) {
  const [showlist, setShowlist] = useState([]);

  async function getShowID(name) {
    const data = await fetch(
      `https://api.themoviedb.org/3/search/tv?api_key=22232a34b1256a41ee95dfdb04aa1810&language=en-US&query=${name}&page=1&include_adult=false`
    ).then((data) => data.json());
    await setShowlist(data.results);
  }

  const handleClick = (e) => {
    e.preventDefault();
    const searchInput = document.getElementsByClassName("find-show");
    getShowID(searchInput[0].value);
  };

  useEffect(() => {
    const showArray = showlist.reduce((lastArray, show) => {
      const showObject = {
        name: show.name,
        show_id: show.id,
        image: show.poster_path,
        vote_average: show.vote_average, //add by david
        overview: show.overview, // add by david
        origin_country: show.origin_country, //add by david
      };
      lastArray.push(showObject);
      return lastArray;
    }, []);
    setSearchList(showArray);
  }, [showlist]);

  return (
    <div className="addshow-nav">
      <form action="/">
        <input
          type="text"
          name="find-show"
          className="find-show"
          placeholder="Search Shows"
          required
        />
        <button onClick={handleClick} className="btn">
          Search
        </button>
      </form>
    </div>
  );
}

export default AddShowNavbar;

import { useEffect, useRef, useState } from "react";

function AddShowNavbar({ setSearchList }) {
  const [showlist, setShowlist] = useState([]);

  async function getShowID(name) {
    const data = await fetch(
      `https://api.themoviedb.org/3/search/tv?api_key=22232a34b1256a41ee95dfdb04aa1810&language=en-US&query=${name}&page=1&include_adult=false`
    ).then((data) => data.json());
    await setShowlist(data.results);
  }

  async function getGenre() {
    const genreData = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=22232a34b1256a41ee95dfdb04aa1810`
    ).then((genreData) => genreData.json());
  }

  async function getShowByGenre(genreCode) {
    const genreFiltered = {};
    const matchArray = [];
    const data = await Promise.all([
      fetch(
        `https://api.themoviedb.org/3/tv/popular?api_key=22232a34b1256a41ee95dfdb04aa1810&language=en-US&page=1&include_adult=false`
      ).then((data) => data.json()),
      fetch(
        `https://api.themoviedb.org/3/tv/popular?api_key=22232a34b1256a41ee95dfdb04aa1810&language=en-US&page=2&include_adult=false`
      ).then((data) => data.json()),
      fetch(
        `https://api.themoviedb.org/3/tv/popular?api_key=22232a34b1256a41ee95dfdb04aa1810&language=en-US&page=3&include_adult=false`
      ).then((data) => data.json()),
      fetch(
        `https://api.themoviedb.org/3/tv/popular?api_key=22232a34b1256a41ee95dfdb04aa1810&language=en-US&page=4&include_adult=false`
      ).then((data) => data.json()),
      fetch(
        `https://api.themoviedb.org/3/tv/popular?api_key=22232a34b1256a41ee95dfdb04aa1810&language=en-US&page=5&include_adult=false`
      ).then((data) => data.json()),
    ]);
    for (const page of data) {
      for (let i = 0; i < page.results.length; i++) {
        if (page.results[i].genre_ids.includes(genreCode) === true) {
          matchArray.push(page.results[i]);
        }
      }
    }
    genreFiltered.results = matchArray;
    await setShowlist(genreFiltered.results);
  }

  const handleClick = (e) => {
    e.preventDefault();
    const searchInput = document.getElementsByClassName("find-show");
    getShowID(searchInput[0].value);
  };

  const genreHandleClick = (e) => {
    e.preventDefault();
    const genreID = [];
    const genreInput = document.getElementsByClassName("Genre");
    genreID.push(genreInput[0].value);
    getShowByGenre(JSON.parse(genreID));
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

  const [titles, setTitles] = useState({});
  const [text, setText] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [inputT, setInputT] = useState('');
  useEffect(() => {
    const loadTitles = async () => {
      const data = await fetch(`https://api.themoviedb.org/3/tv/popular?api_key=22232a34b1256a41ee95dfdb04aa1810&language=en-US`)                          
      .then((data) => data.json());
      await setTitles(data.results);
      console.log("result", data.results)
    }
    loadTitles();
  
  }, [])

  const onSuggestHandler = (text) => {
    setText(text);
   getShowID(text);
    setInputT(text);
  }

  const onChangeHandler = (text) => {
    let matches = [];
    setInputT(text);
    if (text.length > 0) {
      matches = titles.filter( element => {
        const regex = new RegExp(`${text}`, "gi");
        return element.name.match(regex)
      })
    }
    setSuggestions(matches)
    setText(text)
  }



  return (
    <div className="addshow-nav">
      <form>
        <select id="genre" name="Genre" className="Genre">
          <option value="28">Action</option>
          <option value="12">Adventure</option>
          <option value="16">Animation</option>
          <option value="35">Comedy</option>
          <option value="80">Crime</option>
          <option value="99">Documentary</option>
          <option value="18">Drama</option>
          <option value="10752">Family</option>
          <option value="14">Fantasy</option>
          <option value="36">History</option>
          <option value="27">Horror</option>
          <option value="10402">Music</option>
          <option value="9648">Mystery</option>
          <option value="10749">Romance</option>
          <option value="878">Science Fiction</option>
          <option value="10770">TV Movie</option>
          <option value="53">Thriller</option>
          <option value="10752">War</option>
          <option value="37">Western</option>
        </select>
        <button onClick={genreHandleClick} className="btn">
          Genre
        </button>
      </form>
      <form action="/">
        <input
          type="text"
          name="find-show"
          className="find-show"
          placeholder="Search Shows"
          value={inputT}
          required
          autocomplete="off"
          onChange={e => onChangeHandler(e.target.value)}
          onBlur={() => {
            setTimeout(() => {
              setSuggestions([])
            }, 100);
          }}
        />
          {suggestions && suggestions.map((suggestion,i) =>// changed here too and the line after
          <div key={i} className="suggestion" onClick={() => onSuggestHandler(suggestion.name)}>{suggestion.name}</div>)}
          <button onClick={handleClick} className="btn">
          Search
        </button>
      </form>
    </div>
  );
}

export default AddShowNavbar;

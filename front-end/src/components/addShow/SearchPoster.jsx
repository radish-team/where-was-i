import "./style/searchPoster.css";
function SearchPoster(props) {
  function sendBack() {
    props.setShowSelected(props.show);
  }

  const countryFlag = props.show.origin_country[0];

  return (
    <div className="search-cards" onClick={sendBack}>
      <div className="search-image-container">
        <img
          src={`https://image.tmdb.org/t/p/original${props.show.image}`}
          alt=""
        />
      </div>
      <div className="search-text-container">
        <h3>{props.show.name}</h3>
      </div>
      <h4>rating:{props.show.vote_average}</h4>
      <img src={`https://flagcdn.com/w20/${countryFlag}.png`} width={20} />
    </div>
  );
}

export default SearchPoster;

const Favorites = ({ favoriteGifs, setGifUrl }) => {
  console.log("favorites rerendered");

  return (
    <div>
      <h3>Favorites</h3>
      {favoriteGifs?.map((favoriteGif) => {
        return (
          <iframe
            src={favoriteGif}
            onMouseEnter={(e) => {
              e.preventDefault();
              setGifUrl(favoriteGif);
            }}
            width="120"
            height="67.5"
            frameBorder="0"
            className="giphy-embed"
            allowFullScreen></iframe>
        );
      })}
    </div>
  );
};

export default Favorites;

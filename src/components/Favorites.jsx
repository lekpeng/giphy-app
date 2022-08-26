const Favorites = ({ favoriteGifs }) => {
  console.log("favorites rerendered");
  // console.log("favoriteGifs", favoriteGifs);
  return (
    <div>
      <h3>Favorites</h3>
      {favoriteGifs?.map((favoriteGif) => {
        return (
          <iframe
            src={favoriteGif}
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

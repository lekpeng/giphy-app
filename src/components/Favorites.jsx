const Favorites = ({ favoriteGifUrls, setGifUrl }) => {

  return (
    <div>
      <h3>Favorites</h3>
      <p>Hover to see in main view!</p>
      {favoriteGifUrls?.map((favoriteGifUrl) => {
        return (
          <iframe
            src={favoriteGifUrl}
            onMouseEnter={(e) => {
              e.preventDefault();
              setGifUrl(favoriteGifUrl);
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

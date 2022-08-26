import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import { useRef, useState, useEffect } from "react";

const GifDisplay = ({ gifUrl, isLoading, favoriteGifs, addToFavorites, removeFromFavorites }) => {
  const [isChecked, setIsChecked] = useState("");

  useEffect(() => {
    if (gifUrl) {
      setIsChecked(favoriteGifs.includes(gifUrl));
    }
  }, []);

  const updateFavorites = (ev) => {
    if (ev.target.checked) {
      addToFavorites(gifUrl);
      setIsChecked(true);
    } else {
      // remove from favs
      removeFromFavorites(gifUrl);
      setIsChecked(false);
    }
  };

  console.log("favoriteGifs.includes(gifUrl)", favoriteGifs.includes(gifUrl));

  return (
    <div className="gif-display">
      {!isLoading ? (
        <div>
          <iframe
            src={gifUrl}
            width="480"
            height="270"
            frameBorder="0"
            className="giphy-embed"
            allowFullScreen></iframe>
          <div
            style={{
              margin: "auto",
              display: "block",
              width: "fit-content",
            }}>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={updateFavorites}
                  icon={<FavoriteBorder />}
                  checked={isChecked}
                  checkedIcon={<Favorite color="error" />}
                  name="checkedH"
                />
              }
            />
          </div>
        </div>
      ) : (
        <div
          style={{
            height: "270px",
          }}
          className="d-flex justify-content-center align-items-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default GifDisplay;

import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import { useRef } from "react";

const GifDisplay = ({ gifUrl, isLoading }) => {
  console.log("gif display rerendered");
  const likeInput = useRef();

  const toggleLike = (ev) => {
    if (ev.target.checked) {
      // add to favs
    } else {
      // remove from favs
    }
  };
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
                  onClick={toggleLike}
                  icon={<FavoriteBorder />}
                  checkedIcon={<Favorite color="error" />}
                  name="checkedH"
                  ref={likeInput}
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

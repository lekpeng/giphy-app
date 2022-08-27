import "./App.css";
import { useState, useEffect } from "react";
import GifDisplay from "./components/GifDisplay";
import SearchForm from "./components/SearchForm";
import Favorites from "./components/Favorites";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import { fetchRandomGif, fetchSearchGifs } from "./utils/api";

function App() {
  console.log("app rerendered");

  // for search function
  const [searchValue, setSearchValue] = useState("");
  const [gifUrls, setGifUrls] = useState([]);
  const [gifIdx, setGifIdx] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // for gif display
  const [gifUrl, setGifUrl] = useState("");

  // for favorites
  const [favoriteGifs, setFavoriteGifs] = useState([]);
  const [isChecked, setIsChecked] = useState("");

  const getRandomGif = async () => {
    setIsLoading(true);
    setSearchValue("");
    const embeddedUrl = await fetchRandomGif();
    setGifUrl(embeddedUrl);
    setIsLoading(false);
  };

  const getSearchGifs = async () => {
    setIsLoading(true);
    const embeddedUrls = await fetchSearchGifs(searchValue);
    setGifUrls(embeddedUrls);
    setGifUrl(embeddedUrls[0]);
    setIsLoading(false);
  };

  const incrementGifIdx = () => {
    if (gifIdx < gifUrls.length - 1) {
      setGifIdx(gifIdx + 1);
    } else {
      setGifIdx(0);
    }
  };

  const addToFavorites = (favGif) => {
    const updatedFavorites = [favGif, ...favoriteGifs];
    setFavoriteGifs(updatedFavorites);
  };

  const removeFromFavorites = (favGif) => {
    const updatedFavorites = [...favoriteGifs];
    const idxOfGifToRemove = updatedFavorites.indexOf(favGif);
    updatedFavorites.splice(idxOfGifToRemove, 1);
    setFavoriteGifs(updatedFavorites);
  };

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

  // Mounting
  useEffect(() => {
    getRandomGif();
  }, []);

  // Updating
  useEffect(() => {
    if (searchValue) {
      getSearchGifs();
    }
  }, [searchValue]);

  useEffect(() => {
    setGifUrl(gifUrls[gifIdx]);
  }, [gifIdx]);

  useEffect(() => {
    if (gifUrl) {
      setIsChecked(favoriteGifs.includes(gifUrl));
    }
  }, [gifUrl]);

  return (
    <div className="App">
      <div className="row">
        <div className="col-2"></div>
        <div className="col-8">
          <div className="main">
            <h1 className="mb-5">Giphy</h1>
            <SearchForm setSearchValue={setSearchValue} />
            <button onClick={getRandomGif} className="btn btn-primary mt-3 mb-5" type="button">
              Or click here to get a random gif!
            </button>
            {searchValue ? (
              <h3>Search results for: {searchValue}</h3>
            ) : (
              <h3>Here's your random gif</h3>
            )}
            {searchValue && !isLoading && gifUrls.length === 0 && <p>No search results</p>}

            <GifDisplay gifUrl={gifUrl} isLoading={isLoading} favoriteGifs={favoriteGifs} />
            <div
              style={{
                margin: "auto",
                display: "block",
                width: "fit-content",
              }}>
              <FormControlLabel
                style={{ margin: "0" }}
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
            {searchValue && !isLoading && gifUrls.length > 1 && (
              <button onClick={incrementGifIdx} className="btn btn-warning mt-3" type="button">
                Next
              </button>
            )}
          </div>
        </div>
        <div className="col-2">
          <Favorites favoriteGifs={favoriteGifs} setGifUrl={setGifUrl} />
        </div>
      </div>
    </div>
  );
}

export default App;

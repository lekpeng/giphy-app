import "./App.css";
import { useState, useEffect } from "react";
import GifDisplay from "./components/GifDisplay";
import SearchForm from "./components/SearchForm";
import SearchResults from "./components/SearchResults";
import Favorites from "./components/Favorites";
import FavoriteButton from "./components/FavoriteButton";
import { fetchRandomGif, fetchSearchGifs } from "./utils/api";

function App() {
  console.log("app rerendered");

  // for search function
  const [searchValue, setSearchValue] = useState("");
  const [gifUrls, setGifUrls] = useState([]);
  const [gifUrlIdx, setGifUrlIdx] = useState(0);

  // for gif display
  const [gifIsLoading, setGifIsLoading] = useState(false);
  const [gifUrl, setGifUrl] = useState("");

  // for favorites
  const [favoriteGifUrls, setFavoriteGifUrls] = useState([]);
  const [gifIsFavorited, setGifIsFavorited] = useState(false);

  const getRandomGif = async () => {
    setGifIsLoading(true);
    setSearchValue("");
    const embeddedUrl = await fetchRandomGif();
    setGifUrl(embeddedUrl);
    setGifIsLoading(false);
  };

  const getSearchGifs = async () => {
    setGifIsLoading(true);
    const embeddedUrls = await fetchSearchGifs(searchValue);
    setGifUrls(embeddedUrls);
    setGifUrl(embeddedUrls[0]);
    setGifIsLoading(false);
  };

  const incrementGifIdx = () => {
    if (gifUrlIdx < gifUrls.length - 1) {
      setGifUrlIdx(gifUrlIdx + 1);
    } else {
      setGifUrlIdx(0);
    }
  };

  const addToFavorites = (favGif) => {
    const updatedFavorites = [favGif, ...favoriteGifUrls];
    setFavoriteGifUrls(updatedFavorites);
  };

  const removeFromFavorites = (favGif) => {
    const updatedFavorites = [...favoriteGifUrls];
    const idxOfGifToRemove = updatedFavorites.indexOf(favGif);
    updatedFavorites.splice(idxOfGifToRemove, 1);
    setFavoriteGifUrls(updatedFavorites);
  };

  const updateFavorites = (ev) => {
    if (ev.target.checked) {
      addToFavorites(gifUrl);
      setGifIsFavorited(true);
    } else {
      // remove from favs
      removeFromFavorites(gifUrl);
      setGifIsFavorited(false);
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
    setGifUrl(gifUrls[gifUrlIdx]);
  }, [gifUrlIdx]);

  useEffect(() => {
    if (gifUrl) {
      setGifIsFavorited(favoriteGifUrls.includes(gifUrl));
    }
  }, [gifUrl]);

  const canRenderNextButton = searchValue && !gifIsLoading && gifUrls.length > 1;

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
            <SearchResults
              searchValue={searchValue}
              gifUrls={gifUrls}
              gifIsLoading={gifIsLoading}
            />

            <GifDisplay
              gifUrl={gifUrl}
              gifIsLoading={gifIsLoading}
              favoriteGifUrls={favoriteGifUrls}
            />
            <FavoriteButton gifIsFavorited={gifIsFavorited} updateFavorites={updateFavorites} />

            {canRenderNextButton && (
              <button onClick={incrementGifIdx} className="btn btn-warning mt-3" type="button">
                Next
              </button>
            )}
          </div>
        </div>
        <div className="col-2">
          <Favorites favoriteGifUrls={favoriteGifUrls} setGifUrl={setGifUrl} />
        </div>
      </div>
    </div>
  );
}

export default App;

import "./App.css";
import { useState, useEffect } from "react";
import GifDisplay from "./components/GifDisplay";
import Search from "./components/Search";
import Favorites from "./components/Favorites";

function App() {
  console.log("app rerendered")
  const apiKey = "KbEuISuaXSXLHMNJBj853fsn260Ak0Fs";
  const randomGifUrl = `https://api.giphy.com/v1/gifs/random?api_key=${apiKey}`;
  const searchGifUrlBase = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&limit=10&q=`;

  // for search function
  const [searchValue, setSearchValue] = useState("");
  const [gifUrls, setGifUrls] = useState([]);
  const [gifIdx, setGifIdx] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // for gif display
  const [gifUrl, setGifUrl] = useState("");

  const fetchData = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };

  const fetchRandomGif = async () => {
    setIsLoading(true);
    setSearchValue("");
    const data = await fetchData(randomGifUrl);
    setGifUrl(data.data.embed_url);
    setIsLoading(false);
  };

  const fetchSearchGifs = async () => {
    setIsLoading(true);
    const data = await fetchData(searchGifUrlBase + searchValue);
    const embeddedUrls = data.data.map((gif) => gif.embed_url);
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

  // Mounting
  useEffect(() => {
    fetchRandomGif();
  }, []);

  // Updating
  useEffect(() => {
    if (searchValue) {
      fetchSearchGifs();
    }
  }, [searchValue]);

  useEffect(() => {
    setGifUrl(gifUrls[gifIdx]);
  }, [gifIdx]);

  return (
    <div className="App">
      <div className="row">
        <div className="col-2"></div>
        <div className="col-8">
          <div className="main">
            <h1 className="mb-5">Giphy</h1>
            <Search setSearchValue={setSearchValue} />
            <button onClick={fetchRandomGif} className="btn btn-primary mt-3 mb-5" type="button">
              Or click here to get a random gif!
            </button>
            {searchValue ? (
              <h3>Search results for: {searchValue}</h3>
            ) : (
              <h3>Here's your random gif</h3>
            )}
            {searchValue && !isLoading && gifUrls.length === 0 && <p>No search results</p>}

            <GifDisplay gifUrl={gifUrl} isLoading={isLoading} />

            {searchValue && !isLoading && gifUrls.length > 1 && (
              <button onClick={incrementGifIdx} className="btn btn-warning mt-3" type="button">
                Next
              </button>
            )}
          </div>
        </div>
        <div className="col-2">
          <Favorites />
        </div>
      </div>
    </div>
  );
}

export default App;

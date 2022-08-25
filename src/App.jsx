import "./App.css";
import { useState, useEffect } from "react";
import GifDisplay from "./components/GifDisplay";
import Search from "./components/Search";

function App() {
  const apiKey = "KbEuISuaXSXLHMNJBj853fsn260Ak0Fs";
  const randomGifUrl = `https://api.giphy.com/v1/gifs/random?api_key=${apiKey}`;
  const searchGifUrlBase = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&limit=1&q=`;

  const [gifUrl, setGifUrl] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const fetchData = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };

  const fetchRandomGif = async () => {
    const data = await fetchData(randomGifUrl);
    setGifUrl(data.data.embed_url);
  };

  const fetchSearchGif = async () => {
    const data = await fetchData(searchGifUrlBase + searchValue);
    setGifUrl(data.data[0].embed_url);
  };

  // Mounting
  useEffect(() => {
    (async () => {
      await fetchRandomGif();
    })();

    return () => {};
  }, []);

  // Updating
  useEffect(() => {
    (async () => {
      await fetchSearchGif();
    })();
  }, [searchValue]);

  return (
    <div className="App">
      <h1 className="mb-5">Giphy</h1>
      <Search setSearchValue={setSearchValue} />
      <button onClick={fetchRandomGif} className="btn btn-primary mt-3 mb-5" type="button">
        Or click here to get a random gif!
      </button>
      <GifDisplay gifUrl={gifUrl} />
    </div>
  );
}

export default App;

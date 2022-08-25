import "./App.css";
import { useState, useEffect } from "react";
import GifDisplay from "./components/GifDisplay";
import Search from "./components/Search";

function App() {
  const apiKey = "KbEuISuaXSXLHMNJBj853fsn260Ak0Fs";
  const randomGifUrl = `https://api.giphy.com/v1/gifs/random?api_key=${apiKey}`;
  const searchGifUrlBase = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&limit=10&q=`;

  // for search function
  const [searchValue, setSearchValue] = useState("");
  const [gifUrls, setGifUrls] = useState([]);
  const [gifIdx, setGifIdx] = useState(0);

  // for gif display
  const [gifUrl, setGifUrl] = useState("");

  const fetchData = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };

  const fetchRandomGif = async () => {
    setSearchValue("");
    const data = await fetchData(randomGifUrl);
    setGifUrl(data.data.embed_url);
  };

  const fetchSearchGifs = async () => {
    const data = await fetchData(searchGifUrlBase + searchValue);
    console.log("search value", searchValue);
    const embeddedUrls = data.data.map((gif) => gif.embed_url);
    console.log("embeddedUrls", embeddedUrls);
    setGifUrls(embeddedUrls);
    setGifUrl(embeddedUrls[gifIdx]);
  };

  const incrementGifIdx = () => {
    if (gifIdx < 9) {
      setGifIdx(gifIdx + 1);
    } else {
      setGifIdx(0);
    }
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
      await fetchSearchGifs();
    })();
  }, [searchValue]);

  useEffect(() => {
    setGifUrl(gifUrls[gifIdx]);
  }, [gifIdx]);

  return (
    <div className="App">
      <h1 className="mb-5">Giphy</h1>
      <Search setSearchValue={setSearchValue} />
      <button onClick={fetchRandomGif} className="btn btn-primary mt-3 mb-5" type="button">
        Or click here to get a random gif!
      </button>
      {searchValue && <h3>Search results for: {searchValue}</h3>}

      <GifDisplay gifUrl={gifUrl} />
      {searchValue && (
        <button onClick={incrementGifIdx} className="btn btn-warning mt-3" type="button">
          Next
        </button>
      )}
    </div>
  );
}

export default App;

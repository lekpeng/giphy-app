const apiKey = "KbEuISuaXSXLHMNJBj853fsn260Ak0Fs";
const randomGifUrl = `https://api.giphy.com/v1/gifs/random?api_key=${apiKey}`;
const searchGifUrlBase = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&limit=10&q=`;

const fetchData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const fetchRandomGif = async () => {
  //   setIsLoading(true);
  //   setSearchValue("");
  const data = await fetchData(randomGifUrl);
  //   setGifUrl(data.data.embed_url);
  //   setIsLoading(false);
  return data.data.embed_url;
};

const fetchSearchGifs = async (searchValue) => {
  //   setIsLoading(true);
  const data = await fetchData(searchGifUrlBase + searchValue);
  const embeddedUrls = data.data.map((gif) => gif.embed_url);
  return embeddedUrls;
  //   setGifUrls(embeddedUrls);
  //   setGifUrl(embeddedUrls[0]);
  //   setIsLoading(false);
};

export { fetchRandomGif, fetchSearchGifs };

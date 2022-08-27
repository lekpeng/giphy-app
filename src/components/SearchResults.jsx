const SearchResults = ({ searchValue, gifUrls, gifIsLoading }) => {
  return (
    <div>
      {searchValue ? <h3>Search results for: {searchValue}</h3> : <h3>Here's your random gif</h3>}
      {searchValue && !gifIsLoading && gifUrls.length === 0 && <p>No search results</p>}
    </div>
  );
};

export default SearchResults;

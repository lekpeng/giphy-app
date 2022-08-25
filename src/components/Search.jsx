import { useState, useRef } from "react";

const Search = ({ setSearchValue }) => {
  const searchInput = useRef();

  const handleOnSubmit = (ev) => {
    ev.preventDefault();
    const searchValue = searchInput.current.value;
    setSearchValue(searchValue);
    searchInput.current.value = "";
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <div className="row justify-content-center">
        <div className="col-auto">
          <input
            className="form-control"
            type="text"
            name="q"
            ref={searchInput}
            placeholder="Search for a gif here..."
          />
        </div>
        <div className="col-auto">
          <input className="btn btn-success" type="submit" />
        </div>
      </div>
    </form>
  );
};

export default Search;

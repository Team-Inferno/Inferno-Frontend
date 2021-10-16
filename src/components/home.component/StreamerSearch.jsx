import React, { useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import { useQuery } from "react-query";
import { getStreamerSearch } from "../../api/streamer.api";
import axios from "axios";
import Suggestion from "./Suggestion";

const StreamerSearch = () => {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);

  const handleInputChange = (input) => {
    setSearch(input);
    if (search.length > 1) {
      axios
        .get(process.env.REACT_APP_SERVER + "stream/search", {
          params: {
            streamer_query: search,
          },
        })
        .then((res) => {
          setResult(res.data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }else{
        setResult([]);
    }
  };

  return (
    <div className="search">
      <div className="streamer-search">
        <form action="">
          <input
            id="streamer-search-input"
            type="text"
            placeholder={"Search for streamers"}
            value={search}
            onChange={(e) => handleInputChange(e.target.value)}
          />
          <SearchIcon id="streamer-search-button" />
        </form>
      </div>
      {result && <Suggestion suggestions={result} />}
    </div>
  );
};

export default StreamerSearch;

import React from "react";
import { useHistory } from "react-router-dom";

const Suggestion = ({ suggestions }) => {
  const history = useHistory();

  console.log(suggestions);
  const handleClick = (id) => {
    history.push(`/streamer/${id}`);
  };

  return (
    <div className="search-suggestion">
      <ul>
        {suggestions.length > 0
          ? suggestions.map((el, index) => {
              return (
                <li key={el.id} onClick={() => handleClick(el.id)}>
                  {el.username}
                </li>
              );
            })
          : "No match"}
      </ul>
    </div>
  );
};

export default Suggestion;

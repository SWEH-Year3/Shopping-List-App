import React, { useState } from "react";
import { Toolbar } from "radix-ui";
import "../styles/Search.css";
import { IoIosSearch } from "react-icons/io";
import img from "../assets/img/search illustration.svg";
import { Link } from "react-router-dom";

function Search({ sidebarToggle, lists }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredLists = lists.filter((list) =>
    list.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`search-container ${sidebarToggle ? "" : "full-width"}`}>
 
      <Toolbar.Root
        className={`ToolbarRoot ${sidebarToggle ? "" : "full-width"}`}
        aria-label="Formatting options"
      >
        <input 
          type="text"
          placeholder="Search by name..."
          className="ToolbarLink"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ marginRight: 10 }}
        />
        <IoIosSearch className="ToolbarButton" style={{ marginLeft: "auto" }} />
      </Toolbar.Root>

      {searchQuery && (
        <div aria-label="lists" role="result" className="search-results">
          {filteredLists.length > 0 ? (
            filteredLists.map((list) => (
              <Link to={`/list/${list.id}`} key={list.id} className="search-result-item">
                <h4 >{list.title}</h4>
                <p>{list.description}</p>
              </Link>
            ))
          ) : (
            <p className="no-results">No lists found.</p>
          )}
        </div>
      )}

      {!searchQuery && (
        <div className="image-container">
          <img src={img} alt="Search Illustration" className="centered-image" />
        </div>
      )}
    </div>
  );
}

export default Search;
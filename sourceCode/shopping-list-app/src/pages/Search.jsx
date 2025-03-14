import * as React from "react";
import { Toolbar } from "radix-ui";
import "../styles/Search.css";
import { IoIosSearch } from "react-icons/io";
import img from "../assets/img/search illustration.svg"; 

function Search({ sidebarToggle }) {
  return (
    <div className={`search-container ${sidebarToggle ? "" : "full-width"}`}>
      
      <Toolbar.Root
        className={`ToolbarRoot ${sidebarToggle ? "" : "full-width"}`}
        aria-label="Formatting options"
      >
        <Toolbar.Link
          className="ToolbarLink"
          href="#"
          target="_blank"
          style={{ marginRight: 10 }}
        >
          Search by name...
        </Toolbar.Link>
        <IoIosSearch className="ToolbarButton" style={{ marginLeft: "auto" }} />
      </Toolbar.Root>

     
      <div className="image-container">
        <img src={img} alt="Search Illustration" className="centered-image" />
      </div>
    </div>
  );
}

export default Search;
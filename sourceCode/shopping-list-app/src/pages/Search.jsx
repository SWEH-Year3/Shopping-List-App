import * as React from "react";
import { Toolbar } from "radix-ui";
import "../styles/SearchBar.css";
import { IoIosSearch } from "react-icons/io";


const Search = ({ sidebarToggle }) => (
	<Toolbar.Root className={`ToolbarRoot ${sidebarToggle ? "" : "full-width"}`} 
 aria-label="Formatting options">


		<Toolbar.Link
			className="ToolbarLink"
			href="#"
			target="_blank"
			style={{ marginRight: 10 }}
		>
			Search by name...
		</Toolbar.Link>
		<IoIosSearch className="ToolbarButton" style={{ marginLeft: "auto" }}/>


	</Toolbar.Root>
);

export default Search;

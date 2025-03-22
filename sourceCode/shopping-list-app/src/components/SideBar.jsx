import React from "react";
import { Link } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoStatsChart } from "react-icons/io5";
import { LuHistory } from "react-icons/lu";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import "../styles/SideBar.css";
import { ThemeToggle } from "./ThemeToggle";

const SideBar = ({ sidebarToggle }) => {
  return (
    <div className={`sidebar ${sidebarToggle ? "" : "sidebar-hidden"}`}>
      <ul>
        <li>
          <Link to="/search">
            <IoIosSearch />
            Search
          </Link>
        </li>
        <li>
          <Link to="/dashboard">
            <IoStatsChart />
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/myList">
            <HiOutlineSquares2X2 />
            My Lists
          </Link>
        </li>
        {/* <li>
          <Link to="/history">
            <LuHistory />
            History
          </Link>
        </li> */}
        {/* <li>
          <Link to="/recycleBin">
            <FaRegTrashAlt />
            Recycle Bin
          </Link>
        </li> */}
      </ul>
      {/* <ThemeToggle/> */}
    </div>
  );
};

export default SideBar;

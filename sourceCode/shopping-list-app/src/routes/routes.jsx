import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Lists from "../pages/Lists";
import History from "../pages/History";
import RecycleBin from "../pages/RecycleBin";
import Search from "../pages/Search";
import AddItem from "../pages/AddItem";
import EditItem from "../pages/EditItem";
import AddList from "../pages/AddList"

const AppRoutes = ({ sidebarToggle }) => {
  return (
    <Routes>
      <Route path="/search" element={<Search />} />
      <Route path="/AddItem" element={<AddItem />} />
      <Route path="/AddList" element={<AddList />} />
      <Route path="/EditItem" element={<EditItem />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/myList" element={<Lists sidebarToggle={sidebarToggle} />} />
      <Route path="/history" element={<History sidebarToggle={sidebarToggle} />} />
      <Route path="/recycleBin" element={<RecycleBin sidebarToggle={sidebarToggle} />} />
      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
  );
};

export default AppRoutes;

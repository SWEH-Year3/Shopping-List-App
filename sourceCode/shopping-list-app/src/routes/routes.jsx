import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Lists from "../pages/Lists";
import History from "../pages/History";
import RecycleBin from "../pages/RecycleBin";
import Search from "../pages/Search";
import AddItem from "../pages/AddItem";
import EditItem from "../pages/EditItem";
import AddList from "../pages/AddList"
import ListDetails from "../pages/ListDetails";

const AppRoutes = ({ sidebarToggle, lists, addList, addItem }) => {
  return (
    <Routes>
      <Route path="/search" element={<Search />} />
      <Route path="/AddItem/:listId" element={<AddItem addItem={addItem} />} />  
      <Route path="/EditItem/:id" element={<EditItem lists={lists} />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/list/:id" element={<ListDetails lists={lists} />} />
      <Route path="/history" element={<History sidebarToggle={sidebarToggle} />} />
      <Route path="/recycleBin" element={<RecycleBin sidebarToggle={sidebarToggle} />} />
      <Route path="/myList" element={<Lists sidebarToggle={sidebarToggle} lists={lists} />} />
      <Route path="/AddList" element={<AddList addList={addList} />} />
      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
  );
};

export default AppRoutes;

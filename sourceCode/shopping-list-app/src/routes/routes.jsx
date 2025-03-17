import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Lists from "../pages/Lists";
import History from "../pages/History";
import RecycleBin from "../pages/RecycleBin";
import Search from "../pages/Search";
import AddItem from "../pages/AddItem";
import EditItem from "../pages/EditItem";
import EditList from "../pages/EditList"; 
import AddList from "../pages/AddList";
import ListDetails from "../pages/ListDetails";

const AppRoutes = ({
  sidebarToggle,
  lists,
  addList,
  addItem,
  updateList,
  updateItem,
  deleteItem,
  deleteList,
  deletedItems,
  restoreItem,
}) => {
  return (
    <Routes>
      <Route
        path="/search"
        element={<Search sidebarToggle={sidebarToggle} lists={lists} />}
      />
      <Route path="/AddItem/:listId" element={<AddItem addItem={addItem} />} />
      <Route
        path="/EditItem/:listId/:itemId"
        element={<EditItem lists={lists} updateItem={updateItem} />}
      />
      <Route
        path="/EditList/:listId"
        element={<EditList lists={lists} updateList={updateList} />}
      />
      <Route
        path="/myList"
        element={<Lists sidebarToggle={sidebarToggle} lists={lists} deleteList={deleteList} />}
     />
      <Route
        path="/list/:id"
        element={<ListDetails lists={lists} deleteItem={deleteItem} />}
      />
      <Route
      path="/dashboard"
      element={<Dashboard lists={lists} />}
    />
      <Route path="/list/:id" element={<ListDetails lists={lists} />} />
      <Route
        path="/history"
        element={<History sidebarToggle={sidebarToggle} lists={lists} />}
      />


      <Route
        path="/recycleBin"
        element={
          <RecycleBin
            sidebarToggle={sidebarToggle}
            deletedItems={deletedItems}
            restoreItem={restoreItem}
          />
          }
        />
      <Route path="/myList" element={<Lists sidebarToggle={sidebarToggle} lists={lists} />} />
      <Route path="/AddList" element={<AddList addList={addList} />} />
      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
  );
};

export default AppRoutes;
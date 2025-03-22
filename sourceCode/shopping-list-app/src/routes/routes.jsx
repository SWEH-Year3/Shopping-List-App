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
  setSidebarToggle,
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
  checkItem,
  uncheckItem,
  addSharedList
}) => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Lists
            sidebar={setSidebarToggle}
            sidebarToggle={sidebarToggle}
            lists={lists}
            deleteList={deleteList}
          />
        }
      />
      <Route
        path="/search"
        element={
          <Search
            sidebar={setSidebarToggle}
            sidebarToggle={sidebarToggle}
            lists={lists}
          />
        }
      />
      <Route
        path="/AddItem/:listId"
        element={<AddItem addItem={addItem} sidebar={setSidebarToggle} />}
      />
      <Route
        path="/EditItem/:listId/:itemId"
        element={
          <EditItem
            lists={lists}
            updateItem={updateItem}
            sidebar={setSidebarToggle}
          />
        }
      />
      <Route
        path="/EditList/:listId"
        element={
          <EditList
            lists={lists}
            updateList={updateList}
            sidebar={setSidebarToggle}
          />
        }
      />
      <Route
        path="/myList"
        element={
          <Lists
            sidebar={setSidebarToggle}
            sidebarToggle={sidebarToggle}
            lists={lists}
            deleteList={deleteList}
          />
        }
      />
      <Route
        path="/list/:id"
        element={
          <ListDetails
            lists={lists}
            deleteItem={deleteItem}
            sidebar={setSidebarToggle}
            checkItem={checkItem}
            uncheckItem={uncheckItem}
          />
        }
      />
      <Route
        path="/dashboard"
        element={<Dashboard lists={lists} sidebar={setSidebarToggle} />}
      />
      <Route
        path="/list/:id"
        element={<ListDetails lists={lists} sidebar={setSidebarToggle} />}
      />
      <Route
        path="/history"
        element={
          <History
            sidebarToggle={sidebarToggle}
            lists={lists}
            sidebar={setSidebarToggle}
          />
        }
      />

      <Route
        path="/recycleBin"
        element={
          <RecycleBin
            sidebarToggle={sidebarToggle}
            deletedItems={deletedItems}
            restoreItem={restoreItem}
            sidebar={setSidebarToggle}
          />
        }
      />
      <Route
        path="/myList"
        element={
          <Lists
            sidebarToggle={sidebarToggle}
            lists={lists}
            sidebar={setSidebarToggle}
          />
        }
      />
      <Route
        path="/AddList"
        element={
          <AddList
            addList={addList}
            sidebar={setSidebarToggle}
            lists={lists}
            addSharedList={addSharedList}
          />
        }
      />
      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
  );
};

export default AppRoutes;
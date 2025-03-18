import { useState } from "react";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import AppRoutes from "./routes/routes";
import { ThemeProvider } from "./components/ThemeProvider";

function App() {
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const [lists, setLists] = useState([]);
  const [deletedItems, setDeletedItems] = useState([]); 
  const addList = (newList) => {
    setLists((prevLists) => [
      ...prevLists,
      { ...newList, id: Date.now(), items: [], createdAt: new Date().toISOString() },
    ]);
  };

  const addItem = (listId, newItem) => {
    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === parseInt(listId)
          ? { ...list, items: [...(list.items || []), newItem] }
          : list
      )
    );
  };

  const updateList = (updatedList) => {
    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === updatedList.id ? updatedList : list
      )
    );
  };

  const updateItem = (listId, updatedItem) => {
    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === parseInt(listId)
          ? {
              ...list,
              items: list.items.map((item) =>
                item.id === updatedItem.id ? updatedItem : item
              ),
            }
          : list
      )
    );
  };

  const deleteList = (listId) => {
    setLists((prevLists) => prevLists.filter((list) => list.id !== listId));
  };

  const deleteItem = (listId, itemId) => {
    setLists((prevLists) =>
      prevLists.map((list) => {
        if (list.id === parseInt(listId)) {
          const deletedItem = list.items.find((item) => item.id === itemId);
          if (deletedItem) {
            setDeletedItems((prevDeletedItems) => [
              ...prevDeletedItems,
              { ...deletedItem, listId: list.id, deletedAt: new Date().toISOString() },
            ]);
          }
          return {
            ...list,
            items: list.items.filter((item) => item.id !== itemId),
          };
        }
        return list;
      })
    );
  };

  const restoreItem = (itemId) => {
    setDeletedItems((prevDeletedItems) => {
      const itemToRestore = prevDeletedItems.find((item) => item.id === itemId);
      if (itemToRestore) {
        setLists((prevLists) =>
          prevLists.map((list) =>
            list.id === itemToRestore.listId
              ? { ...list, items: [...list.items, itemToRestore] }
              : list
          )
        );
        return prevDeletedItems.filter((item) => item.id !== itemId);
      }
      return prevDeletedItems;
    });
  };

  return (
    <ThemeProvider>
      <NavBar sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle} />
      <SideBar sidebarToggle={sidebarToggle} />
      <div className={`content ${sidebarToggle ? "shifted" : ""}`}>
              <AppRoutes
          setSidebarToggle={setSidebarToggle}
          sidebarToggle={sidebarToggle}
          lists={lists}
          addList={addList}
          addItem={addItem}
          updateList={updateList}
          updateItem={updateItem}
          deleteList={deleteList}
          deleteItem={deleteItem}
          deletedItems={deletedItems} 
          restoreItem={restoreItem} 
        />
      </div>
    </ThemeProvider>
  );
}

export default App;
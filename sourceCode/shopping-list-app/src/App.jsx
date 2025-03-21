import { useState } from "react";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import AppRoutes from "./routes/routes";
import { ThemeProvider } from "./components/ThemeProvider";
import { getLists, getListItems, addList as addListDB, updateList as updateListDB, deleteList as deleteListDB , restoreAllLists as restoreAllListsDB, restoreList as restoreListDB, archiveList as archiveListDB, unarchiveList as unarchiveListDB} from './database/lists';
import { checkItem as checkItemDB, uncheckItem as uncheckItemDB, getItem,  addItem as addItemDB, updateItem as updateItemDB, deleteItem as deleteItemDB, restoreItem as restoreItemDB, restoreAllItems as restoreAllItemsDB } from './database/items';

function App() {
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const [lists, setLists] = useState([]);
  const [deletedItems, setDeletedItems] = useState([]); 
  const addList = async(newList) => {
    // setLists((prevLists) => [
    //   ...prevLists,
    //   { ...newList, id: Date.now(), items: [], createdAt: new Date().toISOString() },
      // ]);

      // db part 
      // 1. get all lists 
      // 2. get items of each list and add it to the list
      // 3. add new list to db 
      window.prompt(`List "${newList.name}" add with id  1`);
      await addListDB(newList.name, newList.description);
      window.prompt(`List "${newList.name}" added successfully with id ${newList.id} 2`);
      let allLists = await getLists();
      window.prompt(`List before 3`);
      window.prompt(`List empty ${allLists.length} before 3`);
      window.prompt(`List "${allLists[0].name}" with id ${allLists[0].id} 3`);
      let allItems = await Promise.all(allLists.map(async (list) => await getListItems(list.id)));
      allLists = allLists.map((list, index) => ({ ...list, items: allItems[index] }));
      setLists(allLists);
      window.prompt(`List "${allLists[0].name}" added successfully with id ${allLists[0].id} 4`);
  };

  const addItem = async(listId, newItem) => {
    // setLists((prevLists) =>
    //   prevLists.map((list) =>
    //     list.id === parseInt(listId)
    //       ? { ...list, items: [...(list.items || []), newItem] }
    //       : list
    //   )
      // );
      
      // db part 
      // 1. add item to db with listid
      // 2. get lists from db
      await addItemDB(listId, ...newItem);
      let allLists = await getLists();
      let allItems = await Promise.all(allLists.map(async (list) => await getListItems(list.id)));
      allLists = allLists.map((list, index) => ({ ...list, items: allItems[index] }));
      setLists(allLists);

  };

  const updateList = async(updatedList) => {
    // setLists((prevLists) =>
    //   prevLists.map((list) =>
    //     list.id === updatedList.id ? updatedList : list
    //   )
    // );

    // db part 
    // 1. update list in db
    // 2. get lists from db
    await updateListDB(updatedList.id,...updatedList);
    let allLists = await getLists();
    let allItems = await Promise.all(allLists.map(async (list) => await getListItems(list.id)));
    allLists = allLists.map((list, index) => ({ ...list, items: allItems[index] }));
    setLists(allLists);
  };

  const updateItem = async(listId, updatedItem) => {
    // setLists((prevLists) =>
    //   prevLists.map((list) =>
    //     list.id === parseInt(listId)
    //       ? {
    //           ...list,
    //           items: list.items.map((item) =>
    //             item.id === updatedItem.id ? updatedItem : item
    //           ),
    //         }
    //       : list
    //   )
      // );

      // db part 
      // 1. update item in db
      // 2. get lists from db
      updateItemDB(updatedItem.id, ...updatedItem);
      let allLists = getLists();
      let allItems = Promise.all(allLists.map(async (list) => await getListItems(list.id)));
      allLists = allLists.map((list, index) => ({ ...list, items: allItems[index] }));
      setLists(allLists);
  };

  const deleteList = async(listId) => {
      // setLists((prevLists) => prevLists.filter((list) => list.id !== listId));

      // db part 
      // 1. delete list from db
      // 2. get lists from db
      deleteListDB(listId);
      let allLists = getLists();    
      let allItems = Promise.all(allLists.map(async (list) => await getListItems(list.id)));
      allLists = allLists.map((list, index) => ({ ...list, items: allItems[index] }));
      setLists(allLists);
  };

  const deleteItem = async(listId, itemId) => {
    // setLists((prevLists) =>
    //   prevLists.map((list) => {
    //     if (list.id === parseInt(listId)) {
    //       const deletedItem = list.items.find((item) => item.id === itemId);
    //       if (deletedItem) {
    //         setDeletedItems((prevDeletedItems) => [
    //           ...prevDeletedItems,
    //           { ...deletedItem, listId: list.id, deletedAt: new Date().toISOString() },
    //         ]);
    //       }
    //       return {
    //         ...list,
    //         items: list.items.filter((item) => item.id !== itemId),
    //       };
    //     }
    //     return list;
    //   })
    // );

    // db part 
    // 1. delete item from db
    // 2. get lists from db
    deleteItemDB(listId, itemId);
    let allLists = getLists();    
    let allItems = Promise.all(allLists.map(async (list) => await getListItems(list.id)));
    allLists = allLists.map((list, index) => ({ ...list, items: allItems[index] }));
    setLists(allLists);
  };

  const restoreItem = async(itemId) => {
    // setDeletedItems((prevDeletedItems) => {
    //   const itemToRestore = prevDeletedItems.find((item) => item.id === itemId);
    //   if (itemToRestore) {
    //     setLists((prevLists) =>
    //       prevLists.map((list) =>
    //         list.id === itemToRestore.listId
    //           ? { ...list, items: [...list.items, itemToRestore] }
    //           : list
    //       )
    //     );
    //     return prevDeletedItems.filter((item) => item.id !== itemId);
    //   }
    //   return prevDeletedItems;
      // });

      // db part 
      // 1. restore item from db
      // 2. get lists from db
      restoreItemDB(itemId);
      let allLists = getLists();    
      let allItems = Promise.all(allLists.map(async (list) => await getListItems(list.id)));
      allLists = allLists.map((list, index) => ({ ...list, items: allItems[index] }));
      setLists(allLists);
    };
    const checkitem = async(itemId) => {
      // setLists((prevLists) =>
      //   prevLists.map((list) =>
      //     list.items.map((item) =>
      //       item.id === itemId ? { ...item, checked: 1 } : item
      //     )
      //   )
      // );

      // db part 
      // 1. update item in db
      // 2. get lists from db
      checkItemDB(itemId);
      let allLists = getLists();    
      let allItems = Promise.all(allLists.map(async (list) => await getListItems(list.id)));
      allLists = allLists.map((list, index) => ({ ...list, items: allItems[index] }));
      setLists(allLists);
    };
    const uncheckitem = async(itemId) => {
      // setLists((prevLists) =>
      //   prevLists.map((list) =>
      //     list.items.map((item) =>
      //       item.id === itemId ? { ...item, checked: 1 } : item
      //     )
      //   )
      // );

      // db part 
      // 1. update item in db
      // 2. get lists from db
      uncheckItemDB(itemId);
      let allLists = getLists();    
      let allItems = Promise.all(allLists.map(async (list) => await getListItems(list.id)));
      allLists = allLists.map((list, index) => ({ ...list, items: allItems[index] }));
      setLists(allLists);
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
          checkItem={checkitem}
          uncheckItem={uncheckitem}        
        />
      </div>
    </ThemeProvider>
  );
}

export default App;
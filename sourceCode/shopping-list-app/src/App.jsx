
// App.jsx
import React, { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import AppRoutes from "./routes/routes";
import { ThemeProvider } from "./components/ThemeProvider";
import {
  getLists,
  getListItems,
  addList as addListDB,
  updateList as updateListDB,
  deleteList as deleteListDB,
  restoreList as restoreListDB,
  archiveList as archiveListDB,
  unarchiveList as unarchiveListDB,
} from "./database/lists";
import {
  checkItem as checkItemDB,
  uncheckItem as uncheckItemDB,
  getItem,
  addItem as addItemDB,
  updateItem as updateItemDB,
  deleteItem as deleteItemDB,
  restoreItem as restoreItemDB,
} from "./database/items";
// import { resetDatabase} from "./database/database";
function App() {
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const [lists, setLists] = useState([]);
  const [deletedItems, setDeletedItems] = useState([]);

  // Refresh the lists (and their items) from the database
  const refreshLists = async () => {
    try {
      const allLists = await getLists();
      const allItems = await Promise.all(
        allLists.map(async (list) => await getListItems(list.id))
      );
      const listsWithItems = allLists.map((list, index) => ({
        ...list,
        items: allItems[index],
      }));
      setLists(listsWithItems);
    } catch (error) {
      console.error("Error refreshing lists:", error);
    }
  };

  // Load lists on component mount
    useEffect(() => {
        refreshLists();
        // resetDatabase();
  }, []);

  // Handler functions for list operations
    const addList = async (newList )=> {
        
            try {
              console.log(`Adding list "${newList.name}"`);
              await addListDB(newList.name, newList.description);
              console.log(`List "${newList.name}" added successfully`);
              await refreshLists();
            } catch (error) {
              console.error("Error adding list:", error);
            }
        
  };
  // Handler functions for list operations
    const addSharedList = async (newList) => {
        
        addListDB(newList.name, newList.description).then(async() => {
          
            await refreshLists().then(async () => {
                let currlist = await getLists();
                console.log(currlist);
                const currlists = currlist.filter((list) => list.ItemCount === 0 && list.name === newList.name)[0];
                console.log(currlists);
                
          console.log(`Adding list "${newList.name}"`);
          console.log(newList);
          // Iterate over newList.items and add each item
          newList?.items.forEach(async (item) => {
            await addItem(currlists.id, item);
          });
                await refreshLists().then(async () => { 
                    // Iterate over newList.items to check items that are marked as checked
                    currlists.items = await getListItems(currlists.id);
                    newList.items.forEach(async (item) => {
                      if (item.checked === 1) {
                          // Find the item in the stored list matching name and description.
                          console.log("add check");
                          console.log(currlists);
                          console.log(currlists.items);
                          
                          const foundItem = currlists?.items?.find(
                          (listItem) =>
                            listItem.name === item.name &&
                            listItem.description === item.description 
                          );
                          console.log(foundItem);
                          if (foundItem) {
                              await checkItem(foundItem.id);
                              console.log(foundItem);
                            await refreshLists();
                        }
                      }
                    });
              
                    console.log(currlists.id, [...newList.items]);
                });
    
                
            });
      });
    };


  const addItem = async (listId, newItem) => {
      try {
        await addItemDB(
          listId,
          newItem.name,
          newItem.description,
          newItem.price,
          newItem.quantity,
          newItem?.image ??''
        );

      await refreshLists();
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const updateList = async (updatedList) => {
    try {
      await updateListDB(
        updatedList.id,
        updatedList.name,
        updatedList.description
      );
      await refreshLists();
    } catch (error) {
      console.error("Error updating list:", error);
    }
  };

  const updateItem = async (listId, updatedItem) => {
      try {
        await updateItemDB(
          updatedItem.id,
          updatedItem.name,
          updatedItem.description,
          updatedItem.price,
          updatedItem.quantity,
          updatedItem.img
        );

      await refreshLists();
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const deleteList = async (listId) => {
    try {
      await deleteListDB(listId);
      await refreshLists();
    } catch (error) {
      console.error("Error deleting list:", error);
    }
  };

  const deleteItem = async (itemId) => {
    try {
      await deleteItemDB(itemId);
      await refreshLists();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const restoreItem = async (itemId) => {
    try {
      await restoreItemDB(itemId);
      await refreshLists();
    } catch (error) {
      console.error("Error restoring item:", error);
    }
  };

  const checkItem = async (itemId) => {
    try {
      await checkItemDB(itemId);
      await refreshLists();
    } catch (error) {
      console.error("Error checking item:", error);
    }
  };

  const uncheckItem = async (itemId) => {
    try {
      await uncheckItemDB(itemId);
      await refreshLists();
    } catch (error) {
      console.error("Error unchecking item:", error);
    }
  };

  return (
    <ThemeProvider>
      <NavBar
        sidebarToggle={sidebarToggle}
        setSidebarToggle={setSidebarToggle}
      />
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
          checkItem={checkItem}
          uncheckItem={uncheckItem}
          addSharedList={addSharedList}
        />
      </div>
    </ThemeProvider>
  );
}

export default App;

// import { useState } from "react";
// import NavBar from "./components/NavBar";
// import SideBar from "./components/SideBar";
// import AppRoutes from "./routes/routes";
// import { ThemeProvider } from "./components/ThemeProvider";
// import {
//   getLists,
//   getListItems,
//   addList as addListDB,
//   updateList as updateListDB,
//   deleteList as deleteListDB,
//   restoreList as restoreListDB,
//   archiveList as archiveListDB,
//   unarchiveList as unarchiveListDB,
// } from "./database/lists";
// import {
// import { async } from './utils/camera';
//   checkItem as checkItemDB,
//   uncheckItem as uncheckItemDB,
//   getItem,
//   addItem as addItemDB,
//   updateItem as updateItemDB,
//   deleteItem as deleteItemDB,
//   restoreItem as restoreItemDB,
// } from "./database/items";

// function App() {
//   const [sidebarToggle, setSidebarToggle] = useState(false);
//   const [lists, setLists] = useState([]);
//   const [deletedItems, setDeletedItems] = useState([]);

//   const refreshLists = async () => {
//     try {
//       let allLists = await getLists();
//       const allItems = await Promise.all(
//         allLists.map(async (list) => await getListItems(list.id))
//       );
//       allLists = allLists.map((list, index) => ({
//         ...list,
//         items: allItems[index],
//       }));
//       setLists(allLists);
//     } catch (error) {
//       console.error("Error refreshing lists:", error);
//     }
//   };

//   const addList = async (newList) => {
//     try {
//       // Log message for debugging (remove window.prompt in production)
//       window.prompt(`Adding list "${newList.name}"`);
//       await addListDB(newList.name, newList.description);
//       window.prompt(`List "${newList.name}" added successfully`);
//       await refreshLists();
//     } catch (error) {
//       console.error("Error adding list:", error);
//     }
//   };

//   const addItem = async (listId, newItem) => {
//     try {
//       // Adjust if your addItemDB expects individual properties instead of spread object
//       await addItemDB(listId, newItem);
//       await refreshLists();
//     } catch (error) {
//       console.error("Error adding item:", error);
//     }
//   };

//   const updateList = async (updatedList) => {
//     try {
//       // Ensure updateListDB receives the right arguments.
//       await updateListDB(
//         updatedList.id,
//         updatedList.name,
//         updatedList.description
//       );
//       await refreshLists();
//     } catch (error) {
//       console.error("Error updating list:", error);
//     }
//   };

//   const updateItem = async (listId, updatedItem) => {
//     try {
//       // Adjust argument passing as required by updateItemDB
//       await updateItemDB(updatedItem.id, updatedItem);
//       await refreshLists();
//     } catch (error) {
//       console.error("Error updating item:", error);
//     }
//   };

//   const deleteList = async (listId) => {
//     try {
//       await deleteListDB(listId);
//       await refreshLists();
//     } catch (error) {
//       console.error("Error deleting list:", error);
//     }
//   };

//   const deleteItem = async (listId, itemId) => {
//     try {
//       await deleteItemDB(listId, itemId);
//       await refreshLists();
//     } catch (error) {
//       console.error("Error deleting item:", error);
//     }
//   };

//   const restoreItem = async (itemId) => {
//     try {
//       await restoreItemDB(itemId);
//       await refreshLists();
//     } catch (error) {
//       console.error("Error restoring item:", error);
//     }
//   };

//   const checkItem = async (itemId) => {
//     try {
//       await checkItemDB(itemId);
//       await refreshLists();
//     } catch (error) {
//       console.error("Error checking item:", error);
//     }
//   };

//   const uncheckItem = async (itemId) => {
//     try {
//       await uncheckItemDB(itemId);
//       await refreshLists();
//     } catch (error) {
//       console.error("Error unchecking item:", error);
//     }
//   };

//   return (
//     <ThemeProvider>
//       <NavBar
//         sidebarToggle={sidebarToggle}
//         setSidebarToggle={setSidebarToggle}
//       />
//       <SideBar sidebarToggle={sidebarToggle} />
//       <div className={`content ${sidebarToggle ? "shifted" : ""}`}>
//         <AppRoutes
//           setSidebarToggle={setSidebarToggle}
//           sidebarToggle={sidebarToggle}
//           lists={lists}
//           addList={addList}
//           addItem={addItem}
//           updateList={updateList}
//           updateItem={updateItem}
//           deleteList={deleteList}
//           deleteItem={deleteItem}
//           deletedItems={deletedItems}
//           restoreItem={restoreItem}
//           checkItem={checkItem}
//           uncheckItem={uncheckItem}
//         />
//       </div>
//     </ThemeProvider>
//   );
// }

// export default App;

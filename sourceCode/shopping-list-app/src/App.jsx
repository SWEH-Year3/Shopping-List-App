import { useState } from "react";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import AppRoutes from "./routes/routes";
import { ThemeProvider } from "./components/ThemeProvider"; 

function App() {
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const [lists, setLists] = useState([]);

 
  const addList = (newList) => {
    setLists((prevLists) => [...prevLists, newList]);
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

  return (
    <ThemeProvider>
      <NavBar sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle} />
      <SideBar sidebarToggle={sidebarToggle} />
      <div className={`content ${sidebarToggle ? "shifted" : ""}`}>
        <AppRoutes
          sidebarToggle={sidebarToggle}
          lists={lists}
          addList={addList}
          addItem={addItem}  
        />
      </div>
    </ThemeProvider>
  );
}

export default App;

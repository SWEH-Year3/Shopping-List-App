import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import AppRoutes from "./routes/routes";
import { useState } from "react";
import { ThemeProvider } from "./components/ThemeProvider"; 

function App() {
  const [sidebarToggle, setSidebarToggle] = useState(false);

  return (
    <ThemeProvider>
      
      <NavBar sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle} />
      <SideBar sidebarToggle={sidebarToggle} />
      <div className={`content ${sidebarToggle ? "shifted" : ""}`}>
        <AppRoutes sidebarToggle={sidebarToggle} />
      </div>
    </ThemeProvider>
  );
}

export default App;

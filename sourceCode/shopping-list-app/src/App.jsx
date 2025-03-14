import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import AppRoutes from "./routes/routes";
import { useState } from "react";

function App() {
  const [sidebarToggle, setSidebarToggle] = useState(false);

  return (
    <>
      <NavBar sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle} />
      <SideBar sidebarToggle={sidebarToggle} />
      <div className={`content ${sidebarToggle ? "shifted" : ""}`}>
        <AppRoutes sidebarToggle={sidebarToggle} />  
      </div>
    </>
  );
}

export default App;

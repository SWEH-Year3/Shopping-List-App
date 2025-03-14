import React from "react";
import { Link } from "react-router-dom";
import "../styles/MyLists.css";
import AddBtn from "../components/AddBtn";
// import Dropdown from "../components/DropDown";






const ListsData = [
  {
    
    lists: [
      { id: 1, name: "List Name", description: "Quick Description...", price: "500", items: 15 },
      { id: 2, name: "List Name", description: "Quick Description...", price: "500", items: 15 },
      { id: 3, name: "List Name", description: "Quick Description...", price: "500", items: 15 },
    ],
  },
];

function History({ sidebarToggle }) {
  return (
    <div className={`my-lists-container ${sidebarToggle ? "" : "full-width"}`}>
      <h2 className="my-lists-title">My Lists</h2>
      {ListsData.map((group, index) => (
        <div key={index} className="list-group">
        
          {group.lists.map((list) => (
            <div key={list.id} className="list-card">
              <div className="list-card-content">
                <h4 className="list-card-title">{list.name}</h4>
                <p className="list-card-desc">{list.description}</p>
              </div>
              {/* <div><Dropdown/></div> */}
              
              <div className="list-card-info">
              
                <p className="list-card-price">L.E {list.price}</p>
                <p className="list-card-items">Items: {list.items}</p>
              </div>
            </div>
          ))}
        </div>
      ))}
      
      <Link to="/AddList"
      >

      <AddBtn/>

      </Link>
    </div>
  );
}

export default History;

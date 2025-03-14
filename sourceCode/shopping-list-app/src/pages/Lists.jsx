import React from "react";
import { Link } from "react-router-dom";
import "../styles/MyLists.css";
import AddBtn from "../components/AddBtn";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { DotsVerticalIcon } from "@radix-ui/react-icons"; 
const ListsData = [
  {
    lists: [
      { id: 1, name: "List Name", description: "Quick Description...", price: "500", items: 15 },
      { id: 2, name: "List Name", description: "Quick Description...", price: "500", items: 15 },
      { id: 3, name: "List Name", description: "Quick Description...", price: "500", items: 15 },
    ],
  },
];

function Lists({ sidebarToggle }) {
  return (
    <div className={`my-lists-container ${sidebarToggle ? "" : "full-width"}`}>
      <h2 className="my-lists-title">My Lists</h2>
      {ListsData.map((group, index) => (
        <div key={index} className="list-group">
          {group.lists.map((list) => (
            <div key={list.id} className="list-card">
             
              <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                  <button className="dropdown-trigger">
                    <DotsVerticalIcon />
                  </button>
                </DropdownMenu.Trigger>

                <DropdownMenu.Portal>
                  <DropdownMenu.Content className="dropdown-content" >
                    <DropdownMenu.Item className="dropdown-item">
                      Edit
                    </DropdownMenu.Item>
                    <DropdownMenu.Item className="dropdown-item">
                      Delete
                    </DropdownMenu.Item>
                    <DropdownMenu.Item className="dropdown-item">
                      QR Code
                    </DropdownMenu.Item>
                    <DropdownMenu.Arrow className="dropdown-arrow" />
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </DropdownMenu.Root>

             
              <div className="list-card-content">
                <h4 className="list-card-title">{list.name}</h4>
                <p className="list-card-desc">{list.description}</p>
              </div>

              
              <div className="list-card-info">
                <p className="list-card-price">L.E {list.price}</p>
                <p className="list-card-items">Items: {list.items}</p>
              </div>
            </div>
          ))}
        </div>
      ))}

      <Link to="/AddList">
        <AddBtn />
      </Link>
    </div>
  );
}

export default Lists;
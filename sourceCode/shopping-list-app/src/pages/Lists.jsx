import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/MyLists.css";
import AddBtn from "../components/AddBtn";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { DotsVerticalIcon } from "@radix-ui/react-icons"; 

function Lists({ sidebarToggle, lists }) {
  const navigate = useNavigate();

  return (
    <div className={`my-lists-container ${sidebarToggle ? "" : "full-width"}`}>
      <h2 className="my-lists-title">My Lists</h2>

      <div className="list-group">
        {lists.map((list) => {
         
          const totalPrice = (Array.isArray(list.items) ? list.items : []).reduce(
            (sum, item) => sum + (item.price * item.quantity || 0),
            0
          );

          return (
            <div 
              key={list.id} 
              className="list-card"
              onClick={() => navigate(`/list/${list.id}`)} 
              style={{ cursor: "pointer" }}
            >
              
              <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                  <button 
                    className="dropdown-trigger"
                    onClick={(e) => e.stopPropagation()} 
                  >
                    <DotsVerticalIcon />
                  </button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Portal>
                  <DropdownMenu.Content className="dropdown-content">
                    <DropdownMenu.Item 
                      className="dropdown-item" 
                      onSelect={() => navigate(`/EditList/${list.id}`)}
                    >
                      Edit
                    </DropdownMenu.Item>
                    <DropdownMenu.Item className="dropdown-item">Delete</DropdownMenu.Item>
                    <DropdownMenu.Item className="dropdown-item">QR Code</DropdownMenu.Item>
                    <DropdownMenu.Arrow className="dropdown-arrow" />
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </DropdownMenu.Root>

              <div className="list-card-content">
                <h4 className="list-card-title">{list.title}</h4>
                <p className="list-card-desc">{list.description}</p>
              </div>

              <div className="list-card-info">
                <p className="list-card-price">L.E {totalPrice}</p>
                <p className="list-card-items">Items: {list.items?.length || 0}</p>
              </div>
            </div>
          );
        })}
      </div>

      <Link to="/AddList">
        <AddBtn />
      </Link>
    </div>
  );
}


export default Lists;

import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import "../styles/ListDetails.css";

function ListDetails({ lists , deleteItem}) {
    const { id } = useParams();
    const navigate = useNavigate();
    
    
    const list = lists.find((l) => l.id === parseInt(id)) || { title: "", items: [] };
  
    
    const totalPrice = (Array.isArray(list.items) ? list.items : []).reduce(
      (sum, item) => sum + (item.price * item.quantity || 0),
      0
    );
  
    return (
      <div className="list-details-container">
        <div className="list-details-header">
          <button className="back-button" onClick={() => navigate(`/myList`)}>←</button>
          <h2>{list.title}</h2>
          <span className="total-price">Total: {totalPrice} L.E.</span>
        </div>
  
        <div className="items-list">
          {(Array.isArray(list.items) ? list.items : []).map((item, index) => (
            <div key={index} className="item-card">
              <input type="checkbox" className="item-checkbox" />
              <img src={item.image || "/placeholder.png"} alt={item.name} className="item-image" />
              <div className="item-details">
                <h4 className="item-name">{item.name}</h4>
                <p className="item-description">{item.description}</p>
            </div>


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
                <DropdownMenu.Content 
                className="dropdown-content"
                side="left" 
                align="center" 
                avoidCollisions={true}
                >
                <DropdownMenu.Item 
                    className="dropdown-item" 
                    onSelect={() => navigate(`/EditItem/${list.id}/${item.id}`)}
                >
                    Edit
                </DropdownMenu.Item>
                
                <DropdownMenu.Item
                    className="dropdown-item"
                    onSelect={() => {
                    if (window.confirm("Are you sure you want to delete this item?")) {
                        deleteItem(list.id, item.id); 
                    }
                    }}
                >
                    Delete
                </DropdownMenu.Item>
                
                <DropdownMenu.Item className="dropdown-item">
                    QR Code
                </DropdownMenu.Item>
                
                <DropdownMenu.Arrow className="dropdown-arrow" />
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
            </DropdownMenu.Root>



              <div className="item-price-info">
                <span className="item-price">L.E {item.price}</span>
                <span className="item-quantity">x {item.quantity}</span>
              </div>
            </div>
          ))}
        </div>
  
        <button className="floating-add-button" onClick={() => navigate(`/AddItem/${list.id}`)}>+</button>
      </div>
    );
  }
export default ListDetails;  
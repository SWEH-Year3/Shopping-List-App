import React from "react";
import "../styles/History.css";
import { useNavigate } from "react-router-dom";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { DotsVerticalIcon } from "@radix-ui/react-icons"; 

const historyData = [
  {
    date: "Mar 20, 2025",
    lists: [
      { id: 1, name: "List Name", description: "Quick Description...", price: "500", items: 15 },
      { id: 2, name: "List Name", description: "Quick Description...", price: "500", items: 15 },
      { id: 3, name: "List Name", description: "Quick Description...", price: "500", items: 15 },
    ],
  },
  {
    date: "Jan 15, 2025",
    lists: [
      { id: 4, name: "List Name", description: "Quick Description...", price: "500", items: 15 },
      { id: 5, name: "List Name", description: "Quick Description...", price: "500", items: 15 },
    ],
  },
];

function History({ sidebarToggle }) {
  const navigate = useNavigate();

  const handleEdit = (listId) => {
    navigate(`/EditItem/${listId}`);
  };
  return (
    <div className={`history-container ${sidebarToggle ? "" : "full-width"}`}>
      <h2 className="history-title">History</h2>
      {historyData.map((group, index) => (
        <div key={index} className="history-group">
          <h3 className="history-date">{group.date}</h3>
          {group.lists.map((list) => (
            <div key={list.id} className="history-card">
             
              <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                  <button className="dropdown-trigger">
                    <DotsVerticalIcon />
                  </button>
                </DropdownMenu.Trigger>

                <DropdownMenu.Portal>
                  <DropdownMenu.Content className="dropdown-content" side="left" align="start">
                    <DropdownMenu.Item className="dropdown-item"
                    onClick={() => handleEdit(list.id)}
                    >
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

              
              <div className="history-card-content">
                <h4 className="history-card-title">{list.name}</h4>
                <p className="history-card-desc">{list.description}</p>
              </div>

              
              <div className="history-card-info">
                <p className="history-card-price">L.E {list.price}</p>
                <p className="history-card-items">Items: {list.items}</p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default History;
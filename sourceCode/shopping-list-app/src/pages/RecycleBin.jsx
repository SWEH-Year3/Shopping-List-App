import React from "react";
import "../styles/RecycleBin.css"; 
import { IoMdRefresh } from "react-icons/io";

const RecycleBin = ({ sidebarToggle }) => {
  const deletedItems = [
    {
      date: "Mar 20, 2025",
      items: [
        { id: 1, name: "item name", details: "Some details in here....", price: 500, quantity: 5 },
        { id: 2, name: "item name", details: "Some details in here....", price: 500, quantity: 5 },
      ],
    },
    {
      date: "Jan 15, 2025",
      items: [
        { id: 3, name: "item name", details: "Some details in here....", price: 500, quantity: 5 },
      ],
    },
  ];

  return (
    <div className={`recycle-bin-container ${sidebarToggle ? "" : "full-width"}`}>
      <h1 className="recycle-title">Recycle Bin</h1>
      {deletedItems.map((group) => (
        <div key={group.date} className="recycle-group">
          <h2 className="recycle-date">{group.date}</h2>
          {group.items.map((item) => (
            <div key={item.id} className="recycle-card">
              <div className="recycle-card-content">
                <div className="recycle-card-header">
                  <input type="checkbox" />
                  <span className="recycle-card-title">{item.name}</span>
                </div>
                <p className="recycle-card-desc">{item.details}</p>
              </div>
              <div className="recycle-card-info">
                <IoMdRefresh className="restore-icon" title="Restore" />
                <p className="recycle-card-price">L.E. {item.price}</p>
                <p className="recycle-card-quantity">x {item.quantity}</p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default RecycleBin;


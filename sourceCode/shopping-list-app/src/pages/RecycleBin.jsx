import React from "react";
import "../styles/RecycleBin.css";
import { IoMdRefresh } from "react-icons/io";

const RecycleBin = ({ sidebarToggle, deletedItems, restoreItem }) => {
 
  const groupedItems = deletedItems.reduce((acc, item) => {
    const date = new Date(item.deletedAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {});

  return (
    <div className={`recycle-bin-container ${sidebarToggle ? "" : "full-width"}`}>
      <h1 className="recycle-title">Recycle Bin</h1>
      {Object.entries(groupedItems).map(([date, items]) => (
        <div key={date} className="recycle-group">
          <h2 className="recycle-date">{date}</h2>
          {items.map((item) => (
            <div key={item.id} className="recycle-card">
              <div className="recycle-card-content">
                <div className="recycle-card-header">
                  <input type="checkbox" />
                  <span className="recycle-card-title">{item.name}</span>
                </div>
                <p className="recycle-card-desc">{item.details}</p>
              </div>
              <div className="recycle-card-info">
                <IoMdRefresh
                  className="restore-icon"
                  title="Restore"
                  onClick={() => restoreItem(item.id)} 
                />
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
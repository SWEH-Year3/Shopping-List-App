import React from "react";
import "../styles/History.css";

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
  return (
    <div className={`history-container ${sidebarToggle ? "" : "full-width"}`}>
      <h2 className="history-title">History</h2>
      {historyData.map((group, index) => (
        <div key={index} className="history-group">
          <h3 className="history-date">{group.date}</h3>
          {group.lists.map((list) => (
            <div key={list.id} className="history-card">
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

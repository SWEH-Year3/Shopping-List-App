import React from "react";
import "../styles/History.css";
import { useNavigate } from "react-router-dom";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { DotsVerticalIcon } from "@radix-ui/react-icons";

function History({ sidebar, sidebarToggle, lists }) {
  const navigate = useNavigate();

  // Group lists by formatted created_at date
  const groupedLists = lists.reduce((acc, list) => {
    const date = new Date(list.created_at).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(list);
    return acc;
  }, {});

  const handleEdit = (listId) => {
    navigate(`/EditItem/${listId}`);
  };

  return (
    <div
      onClick={() => sidebar(false)}
      className={`history-container ${sidebarToggle ? "" : "full-width"}`}
    >
      <h2 className="history-title">History</h2>
      {Object.entries(groupedLists).map(([date, lists]) => (
        <div key={date} className="history-group">
          <h3 className="history-date">{date}</h3>
          {lists.map((list) => (
            <div key={list.id} className="history-card">
              <div className="history-card-content">
                <h4 className="history-card-title">{list.name}</h4>
                <p className="history-card-desc">{list.description}</p>
              </div>
              <div className="history-card-info">
                <p className="history-card-price">
                  L.E{" "}
                  {(list.items || []).reduce(
                    (sum, item) => sum + (item.price * item.quantity || 0),
                    0
                  )}
                </p>
                <p className="history-card-items">
                  Items: {(list.items || []).length}
                </p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default History;

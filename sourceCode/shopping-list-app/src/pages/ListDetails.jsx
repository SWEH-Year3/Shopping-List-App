import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import "../styles/ListDetails.css";
import Share from "../components/Share";

const defaultImage =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTA5IiBoZWlnaHQ9IjExMCIgdmlld0JveD0iMCAwIDEwOSAxMTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+DQo8cmVjdCB3aWR0aD0iMTA5IiBoZWlnaHQ9IjExMCIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC4wMSIvPg0KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xOC4xNjY2IDcuMzMzMzdIOTAuODMzM0M5Ni44NTMgNy4zMzMzNyAxMDEuNzMzIDEyLjI1ODIgMTAxLjczMyAxOC4zMzM0VjkxLjY2NjdDMTAxLjczMyA5Ny43NDE2IDk2Ljg1MyAxMDIuNjY3IDkwLjgzMzMgMTAyLjY2N0gxOC4xNjY2QzEyLjE0NjcgMTAyLjY2NyA3LjI2NjYgOTcuNzQxNiA3LjI2NjYgOTEuNjY2N1YxOC4zMzM0QzcuMjY2NiAxMi4yNTgyIDEyLjE0NjcgNy4zMzMzNyAxOC4xNjY2IDcuMzMzMzdaTTE4LjE2NjYgMTQuNjY2N0MxNi4xNiAxNC42NjY3IDE0LjUzMzMgMTYuMzA4MyAxNC41MzMzIDE4LjMzMzRWNjEuMzMzMUwyNi43NTQzIDQ4Ljk5OTlDMjcuMzgxNCA0OC4zNjcxIDI4LjIzNjIgNDguMDE4NSAyOS4xMjI4IDQ4LjAzMzlDMzAuMDA5NSA0OC4wNDkyIDMwLjg1MTkgNDguNDI3MyAzMS40NTcgNDkuMDgxNUw1Ny4yMTQ0IDc2LjkyNzRMNzcuNjIxIDU2LjMzMzJDNzguODk3OCA1NS4wNDQ2IDgwLjk2ODggNTUuMDQ0NiA4Mi4yNDU1IDU2LjMzMzJMOTQuNDY2NiA2OC42NjY0VjE4LjMzMzRDOTQuNDY2NiAxNi4zMDgzIDkyLjgzOTYgMTQuNjY2NyA5MC44MzMzIDE0LjY2NjdIMTguMTY2NlpNMTQuNTMzMyA5MS42NjY3VjcwLjY2N0wyOC45ODU3IDU2LjA4MTlMNTQuNzI1OSA4My45MDg4TDY0Ljk3MjEgOTUuMzMzNEgxOC4xNjY2QzE2LjE2IDk1LjMzMzQgMTQuNTMzMyA5My42OTE0IDE0LjUzMzMgOTEuNjY2N1pNOTAuODMzMyA5NS4zMzM0SDczLjc5MjlMNjEuNjQ1NyA4MS43ODg3TDc5LjkzMzMgNjMuMzMzNkw5NC40NjY2IDc4LjAwMDNWOTEuNjY2N0M5NC40NjY2IDkzLjY5MTQgOTIuODM5NiA5NS4zMzM0IDkwLjgzMzMgOTUuMzMzNFpNNDguMzE3NiA0MC4zMzM0QzQ4LjMxNzYgMzYuODg3NyA1MS4wODU1IDM0LjA5NDMgNTQuNDk5OSAzNC4wOTQzQzU3LjkxNDMgMzQuMDk0MyA2MC42ODIzIDM2Ljg4NzcgNjAuNjgyMyA0MC4zMzM0QzYwLjY4MjMgNDMuNzc5MSA1Ny45MTQzIDQ2LjU3MjQgNTQuNDk5OSA0Ni41NzI0QzUxLjA4NTUgNDYuNTcyNCA0OC4zMTc2IDQzLjc3OTEgNDguMzE3NiA0MC4zMzM0Wk01NC40OTk5IDI3LjQ5NDNDNDcuNDczNiAyNy40OTQzIDQxLjc3NzYgMzMuMjQyNiA0MS43Nzc2IDQwLjMzMzRDNDEuNzc3NiA0Ny40MjQyIDQ3LjQ3MzYgNTMuMTcyNCA1NC40OTk5IDUzLjE3MjRDNjEuNTI2MyA1My4xNzI0IDY3LjIyMjMgNDcuNDI0MiA2Ny4yMjIzIDQwLjMzMzRDNjcuMjIyMyAzMy4yNDI2IDYxLjUyNjMgMjcuNDk0MyA1NC40OTk5IDI3LjQ5NDNaIiBmaWxsPSIjMUMyMDI0Ii8+DQo8L3N2Zz4NCg==";

function ListDetails({ sidebar, lists, deleteItem, checkItem, uncheckItem }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isShareOpen, setIsShareOpen] = useState(false);
  const [selectedList, setSelectedList] = useState(null);

  // Use list.name since your DB uses "name" for lists
  const list = lists.find((l) => l.id === parseInt(id)) || {
    name: "",
    items: [],
  };

  const totalPrice = list.TotalCost;
  // Alternatively, if TotalCost isn't available, you can calculate:
  // const totalPrice = (Array.isArray(list.items) ? list.items : []).reduce(
  //   (sum, item) => sum + (item.price || 0),
  //   0
  // );

  return (
    <div onClick={() => sidebar(false)} className="list-details-container">
      <div className="list-details-header">
        <button className="back-button" onClick={() => navigate(`/myList`)}>
          ←
        </button>
        <h2>{list.name}</h2>
        <span className="total-price">Total: {totalPrice} L.E.</span>
      </div>

      <div className="items-list">
        {(Array.isArray(list.items) ? list.items : []).map((item, index) => (
          <div key={index} className="item-card">
            <input
              type="checkbox"
              checked={item.checked === 1 ? true : false}
              className="item-checkbox"
              onClick={() =>
                item.checked ? uncheckItem(item.id) : checkItem(item.id)
              }
            />
            <img
              src={item.img || defaultImage}
              alt={item.name}
              className="item-image"
            />
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
                      if (
                        window.confirm(
                          "Are you sure you want to delete this item?"
                        )
                      ) {
                        deleteItem(item.id);
                      }
                    }}
                  >
                    Delete
                  </DropdownMenu.Item>

                  <DropdownMenu.Item
                    className="dropdownMenu-item"
                    onSelect={() => {
                      setSelectedList(item);
                      setIsShareOpen(true);
                    }}
                  >
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

      <button
        className="floating-add-button"
        onClick={() => navigate(`/AddItem/${list.id}`)}
      >
        +
      </button>

      {isShareOpen && (
        <Share
          openDialog={isShareOpen}
          onOpenChange={(open) => {
            setIsShareOpen(open);
            if (!open) {
              setSelectedList(null);
            }
          }}
          object={selectedList}
        />
      )}
    </div>
  );
}

export default ListDetails;

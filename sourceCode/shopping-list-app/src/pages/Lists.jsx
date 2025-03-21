import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/MyLists.css";
import AddBtn from "../components/AddBtn";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import Share from "../components/Share";

function Lists({ sidebar, sidebarToggle, lists, deleteList }) {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [selectedList, setSelectedList] = useState(null);

  return (
    <div
      onClick={() => sidebar(false)}
      className={`my-lists-container ${sidebarToggle ? "" : "full-width"}`}
    >
      <h2 className="my-lists-title">My Lists</h2>

      <div className="list-group">
        {lists.map((list) => {
          const totalPrice = list.TotalCost;
        //   const totalPrice = (list.items || []).reduce(
        //     (sum, item) => sum + (item.price  || 0),
        //     0
        //   );

          return (
            <div
              key={list.id}
              className="list-card"
              onClick={() => {
                if (!dropdownOpen) {
                  navigate(`/list/${list.id}`);
                }
              }}
              style={{ cursor: "pointer" }}
            >
              <DropdownMenu.Root onOpenChange={(open) => setDropdownOpen(open)}>
                <DropdownMenu.Trigger asChild>
                  <button
                    className="dropdownMenu-trigger"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <DotsVerticalIcon />
                  </button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Portal>
                  <DropdownMenu.Content className="dropdownMenu-content">
                    <DropdownMenu.Item
                      className="dropdownMenu-item"
                      onSelect={() => {
                        navigate(`/EditList/${list.id}`);
                      }}
                    >
                      Edit
                    </DropdownMenu.Item>
                    <DropdownMenu.Item
                      className="dropdownMenu-item"
                      onSelect={() => {
                        if (
                          window.confirm(
                            "Are you sure you want to delete this list?"
                          )
                        ) {
                          deleteList(list.id);
                        }
                      }}
                    >
                      Delete
                    </DropdownMenu.Item>
                    <DropdownMenu.Item
                      className="dropdownMenu-item"
                      onSelect={() => {
                        // Set the list to share and open the Share dialog.
                        setSelectedList(list);
                        setIsShareOpen(true);
                      }}
                    >
                      QR Code
                    </DropdownMenu.Item>
                    <DropdownMenu.Arrow className="dropdownMenu-arrow" />
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </DropdownMenu.Root>

              <div className="list-card-content">
                <h4 className="list-card-title">{list.title}</h4>
                <p className="list-card-desc">{list.description}</p>
              </div>

              <div className="list-card-info">
                <p className="list-card-price">L.E {totalPrice}</p>
                <p className="list-card-items">
                  {/* Items: {(list.items || []).length} */}
                  Items: {list.ItemCount}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <Link to="/AddList">
        <AddBtn />
      </Link>

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

export default Lists;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AddList.css";
import Scan from "./Scan";
import logo from "../assets/img/scanner-icon.svg";
function ListCard({ sidebar, addList, addSharedList }) {
  const navigate = useNavigate();

  const [isShareOpen, setIsShareOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    items: 0,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!addList) {
      console.error("addList function is not available");
      return;
    }

    const newList = {
      name: formData.name,
      description: formData.description,
      price: formData.price,
      items: formData.items,
    };

    addList(newList);
    navigate("/myList");
  };

  return (
    <div onClick={() => sidebar(false)} className="add-item-container">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <h2>Add List</h2>
        <img
          src={logo}
          alt="scanner icon"
          onClick={() => setIsShareOpen(true)}
        />
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="name"
          placeholder="e.g. Groceries"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          placeholder="e.g. Weekly groceries shopping"
          value={formData.description}
          onChange={handleChange}
        />

        <button type="submit">+ Add List</button>
      </form>
      {isShareOpen && (
        <Scan
          openDialog={isShareOpen}
          onOpenChange={(open) => {
            setIsShareOpen(open);
          }}
          objectSetter={(data) => {
            addSharedList(data);
            
            navigate("/myList");
          }}
        />
      )}
    </div>
  );
}

export default ListCard;

import React, { useState } from "react";
import "../styles/AddList.css";

function ListCard() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",

  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("List added:", formData);
    // Add logic to save the item
  };

  return (
    <div className="add-item-container">
      <h2>Add List</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
        id="title"
          type="text"
          name="title"
          placeholder="e.g. Milk"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <label htmlFor="description">Description</label>
        <textarea
        id="description"
          name="description"
          placeholder="e.g. Oat milk, 2 Liter"
          value={formData.description}
          onChange={handleChange}
        />

        <button type="submit">
            + Add List
        </button>
      </form>
    </div>
  );
}

export default ListCard;

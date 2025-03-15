import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AddList.css";

function ListCard({ addList }) {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: "",
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
      id: Date.now(), 
      title: formData.title,
      description: formData.description,
      price: formData.price,
      items: formData.items,
    };

    addList(newList); 
    navigate("/myList");
  };

  return (
    <div className="add-item-container">
      <h2>Add List</h2>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          type="text"
          name="title"
          placeholder="e.g. Groceries"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <label>Description</label>
        <textarea
          name="description"
          placeholder="e.g. Weekly groceries shopping"
          value={formData.description}
          onChange={handleChange}
        />


        <button type="submit">+ Add List</button>
      </form>
    </div>
  );
}

export default ListCard;

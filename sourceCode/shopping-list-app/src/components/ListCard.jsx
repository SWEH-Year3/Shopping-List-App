import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AddList.css";

function ListCard({sidebar, addList }) {
  const navigate = useNavigate();
  
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
    <div onClick={()=>sidebar(false)} className="add-item-container">
      <h2>Add List</h2>
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
    </div>
  );
}

export default ListCard;

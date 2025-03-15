import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/AddItem.css";

function EditItem({ lists }) {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    quantity: "",
    price: "",
    image: null,
  });

  
  useEffect(() => {
    const existingItem = lists.find((item) => item.id === parseInt(id));
    if (existingItem) {
      setFormData({
        title: existingItem.title,
        description: existingItem.description,
        quantity: existingItem.quantity || "",
        price: existingItem.price || "",
        image: existingItem.image || null,
      });
    }
  }, [id, lists]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Item Edited:", formData);
    // Add logic to save the updated item
  };

  return (
    <div className="add-item-container">
      <h2>Edit Item</h2>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
        />

        <label>Quantity</label>
        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          required
        />

        <label>Price</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <label>Upload Image</label>
        <input type="file" onChange={handleImageUpload} />

        <button type="submit" className="add-item-button">
          Update Item
        </button>
      </form>
    </div>
  );
}

export default EditItem;

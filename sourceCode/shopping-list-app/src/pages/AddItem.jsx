import React, { useState } from "react";
import "../styles/AddItem.css";

function AddItem() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    quantity: "",
    price: "",
    image: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Item added:", formData);
    // Add logic to save the item
  };

  return (
    <div className="add-item-container">
      <h2>Add Item</h2>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          type="text"
          name="title"
          placeholder="e.g. Milk"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <label>Description</label>
        <textarea
          name="description"
          placeholder="e.g. Oat milk, 2 Liter"
          value={formData.description}
          onChange={handleChange}
        />

        <label>Quantity</label>
        <input
          type="number"
          name="quantity"
          placeholder="e.g. 2"
          value={formData.quantity}
          onChange={handleChange}
          required
        />

        <label>Price</label>
        <input
          type="number"
          name="price"
          placeholder="e.g. 50"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <label>Upload Image</label>
        <input type="file" onChange={handleImageUpload} />

        <button type="submit" className="add-item-button">
            + Add Item
        </button>
      </form>
    </div>
  );
}

export default AddItem;

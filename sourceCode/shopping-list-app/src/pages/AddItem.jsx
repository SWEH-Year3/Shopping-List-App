import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/AddItem.css";

function AddItem({ addItem }) {
  const { listId } = useParams(); 
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    quantity: 1,
    price: "",
    image: null,
    imagePreview: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: file,
        imagePreview: URL.createObjectURL(file), 
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newItem = {
      id: Date.now(),
      name: formData.name,
      description: formData.description,
      quantity: parseInt(formData.quantity),
      price: parseFloat(formData.price),
      image: formData.imagePreview || "/placeholder.png",
    };

    addItem(listId, newItem); 
    navigate(`/list/${listId}`); 
  };

  return (
    <div className="add-item-container">
      <h2>Add Item</h2>
      <form onSubmit={handleSubmit}>
        <label>Item Name</label>
        <input
          type="text"
          name="name"
          placeholder="e.g. Milk"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label>Description</label>
        <textarea
          name="description"
          placeholder="e.g. Oat milk, 2 Liters"
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

       
        {formData.imagePreview && (
          <img src={formData.imagePreview} alt="Preview" className="image-preview" />
        )}

        <button type="submit" className="add-item-button">+ Add Item</button>
      </form>
    </div>
  );
}

export default AddItem;

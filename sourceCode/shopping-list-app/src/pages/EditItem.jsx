import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/EditItem.css";

function EditItem({ sidebar, lists, updateItem }) {
  const { listId, itemId } = useParams();
  const navigate = useNavigate();

  const list = lists.find((l) => l.id === parseInt(listId));
  const item = list?.items.find((i) => i.id === parseInt(itemId));

  const [formData, setFormData] = useState({
    name: item?.name || "",
    description: item?.description || "",
    quantity: item?.quantity || 1,
    price: item?.price || "",
    image: null,
    imagePreview: item?.image || null,
  });

  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name,
        description: item.description,
        quantity: item.quantity,
        price: item.price,
        image: null,
        imagePreview: item.image || null,
      });
    }
  }, [item]);

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

    const updatedItem = {
      id: item.id,
      name: formData.name,
      description: formData.description,
      quantity: parseInt(formData.quantity),
      price: parseFloat(formData.price),
      image: formData.imagePreview || "/placeholder.png",
    };

    updateItem(listId, updatedItem);
    navigate(`/list/${listId}`);
  };

  return (
    <div onClick={()=>sidebar(false)} className="add-item-container">
      <h2>Edit Item</h2>
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



        <button type="submit" className="add-item-button">
          Update Item
        </button>
      </form>
    </div>
  );
}

export default EditItem;
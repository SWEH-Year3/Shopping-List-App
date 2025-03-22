import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/AddItem.css";
import Scan from "../components/Scan";
import logo from "../assets/img/scanner-icon.svg";

const defaultImage =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTA5IiBoZWlnaHQ9IjExMCIgdmlld0JveD0iMCAwIDEwOSAxMTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+DQo8cmVjdCB3aWR0aD0iMTA5IiBoZWlnaHQ9IjExMCIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC4wMSIvPg0KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xOC4xNjY2IDcuMzMzMzdIOTAuODMzM0M5Ni44NTMgNy4zMzMzNyAxMDEuNzMzIDEyLjI1ODIgMTAxLjczMyAxOC4zMzM0VjkxLjY2NjdDMTAxLjczMyA5Ny43NDE2IDk2Ljg1MyAxMDIuNjY3IDkwLjgzMzMgMTAyLjY2N0gxOC4xNjY2QzEyLjE0NjcgMTAyLjY2NyA3LjI2NjYgOTcuNzQxNiA3LjI2NjYgOTEuNjY2N1YxOC4zMzM0QzcuMjY2NiAxMi4yNTgyIDEyLjE0NjcgNy4zMzMzNyAxOC4xNjY2IDcuMzMzMzdaTTE4LjE2NjYgMTQuNjY2N0MxNi4xNiAxNC42NjY3IDE0LjUzMzMgMTYuMzA4MyAxNC41MzMzIDE4LjMzMzRWNjEuMzMzMUwyNi43NTQzIDQ4Ljk5OTlDMjcuMzgxNCA0OC4zNjcxIDI4LjIzNjIgNDguMDE4NSAyOS4xMjI4IDQ4LjAzMzlDMzAuMDA5NSA0OC4wNDkyIDMwLjg1MTkgNDguNDI3MyAzMS40NTcgNDkuMDgxNUw1Ny4yMTQ0IDc2LjkyNzRMNzcuNjIxIDU2LjMzMzJDNzguODk3OCA1NS4wNDQ2IDgwLjk2ODggNTUuMDQ0NiA4Mi4yNDU1IDU2LjMzMzJMOTQuNDY2NiA2OC42NjY0VjE4LjMzMzRDOTQuNDY2NiAxNi4zMDgzIDkyLjgzOTYgMTQuNjY2NyA5MC44MzMzIDE0LjY2NjdIMTguMTY2NlpNMTQuNTMzMyA5MS42NjY3VjcwLjY2N0wyOC45ODU3IDU2LjA4MTlMNTQuNzI1OSA4My45MDg4TDY0Ljk3MjEgOTUuMzMzNEgxOC4xNjY2QzE2LjE2IDk1LjMzMzQgMTQuNTMzMyA5My42OTE0IDE0LjUzMzMgOTEuNjY2N1pNOTAuODMzMyA5NS4zMzM0SDczLjc5MjlMNjEuNjQ1NyA4MS43ODg3TDc5LjkzMzMgNjMuMzMzNkw5NC40NjY2IDc4LjAwMDNWOTEuNjY2N0M5NC40NjY2IDkzLjY5MTQgOTIuODM5NiA5NS4zMzM0IDkwLjgzMzMgOTUuMzMzNFpNNDguMzE3NiA0MC4zMzM0QzQ4LjMxNzYgMzYuODg3NyA1MS4wODU1IDM0LjA5NDMgNTQuNDk5OSAzNC4wOTQzQzU3LjkxNDMgMzQuMDk0MyA2MC42ODIzIDM2Ljg4NzcgNjAuNjgyMyA0MC4zMzM0QzYwLjY4MjMgNDMuNzc5MSA1Ny45MTQzIDQ2LjU3MjQgNTQuNDk5OSA0Ni41NzI0QzUxLjA4NTUgNDYuNTcyNCA0OC4zMTc2IDQzLjc3OTEgNDguMzE3NiA0MC4zMzM0Wk01NC40OTk5IDI3LjQ5NDNDNDcuNDczNiAyNy40OTQzIDQxLjc3NzYgMzMuMjQyNiA0MS43Nzc2IDQwLjMzMzRDNDEuNzc3NiA0Ny40MjQyIDQ3LjQ3MzYgNTMuMTcyNCA1NC40OTk5IDUzLjE3MjRDNjEuNTI2MyA1My4xNzI0IDY3LjIyMjMgNDcuNDI0MiA2Ny4yMjIzIDQwLjMzMzRDNjcuMjIyMyAzMy4yNDI2IDYxLjUyNjMgMjcuNDk0MyA1NC40OTk5IDI3LjQ5NDNaIiBmaWxsPSIjMUMyMDI0Ii8+DQo8L3N2Zz4NCg==";
function AddItem({ sidebar, addItem }) {
  const { listId } = useParams();
    const navigate = useNavigate();
    
    const [isShareOpen, setIsShareOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    quantity: "",
    price: "",
    image: null,
    imagePreview: defaultImage,
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

    if (formData.image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newItem = {
          id: Date.now(),
          name: formData.name,
          description: formData.description,
          quantity: formData.quantity,
          price: parseFloat(formData.price),
          image: reader.result ?? defaultImage, // base64 string
        };
        addItem(listId, newItem);
        navigate(`/list/${listId}`);
      };
      reader.readAsDataURL(formData.image);
    } else {
      const newItem = {
        id: Date.now(),
        name: formData.name,
        description: formData.description,
        quantity: formData.quantity,
        price: parseFloat(formData.price),
        image: defaultImage,
      };
      addItem(listId, newItem);
      navigate(`/list/${listId}`);
    }
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
              <h2>Add Item</h2>
              <img
                src={logo}
                alt="scanner icon"
                onClick={() => setIsShareOpen(true)}
              />
            </div>
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
          type="text"
          name="quantity"
          placeholder="e.g. 2 kg"
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

        <label htmlFor="img">Upload Image</label>
        <input id="img" type="file" onChange={handleImageUpload} />

        {formData.imagePreview && (
          <img
            src={formData.imagePreview}
            alt="Preview"
            className="image-preview"
          />
        )}

        <button type="submit" className="add-item-button">
          + Add Item
        </button>
          </form>
          {isShareOpen && (
                  <Scan
                    openDialog={isShareOpen}
                    onOpenChange={(open) => {
                      setIsShareOpen(open);
                    }}
                    objectSetter={(data) => {
                      addItem(listId,data);
                      
                      navigate("/myList");
                    }}
                  />
                )}
    </div>
  );
}

export default AddItem;

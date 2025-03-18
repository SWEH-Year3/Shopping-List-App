import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/EditList.css";

function EditList({ sidebar, lists, updateList }) {
  const { listId } = useParams();
  const navigate = useNavigate();

  const list = lists.find((l) => l.id === parseInt(listId));

  const [formData, setFormData] = useState({
    title: list?.title || "",
    description: list?.description || "",
  });

  useEffect(() => {
    if (list) {
      setFormData({
        title: list.title,
        description: list.description,
      });
    }
  }, [list]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedList = {
      id: list.id,
      title: formData.title,
      description: formData.description,
      items: list.items,
    };

    updateList(updatedList);
    navigate(`/myList`);
  };

  return (
    <div onClick={()=>sidebar(false)} className="add-list-container">
      <h2>Edit List</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">List Name</label>
        <input
          id="name"
          type="text"
          name="title"
          placeholder="e.g. Grocery List"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <label htmlFor="description">Description</label>
        <textarea
         id="description"
          name="description"
          placeholder="e.g. Weekly grocery list"
          value={formData.description}
          onChange={handleChange}
        />

        <button type="submit" className="add-list-button">
          Update List
        </button>
      </form>
    </div>
  );
}

export default EditList; 
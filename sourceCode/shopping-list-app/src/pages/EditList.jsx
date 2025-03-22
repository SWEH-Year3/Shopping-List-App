import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/EditList.css";

function EditList({ sidebar, lists, updateList }) {
  const { listId } = useParams();
  const navigate = useNavigate();

  // Use 'name' since your database uses name, not title.
  const list = lists.find((l) => l.id === parseInt(listId));

  const [formData, setFormData] = useState({
    name: list?.name || "",
    description: list?.description || "",
  });

  useEffect(() => {
    if (list) {
      setFormData({
        name: list.name,
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
      name: formData.name,
      description: formData.description,
      items: list.items,
    };

    updateList(updatedList);
    navigate(`/myList`);
  };

  return (
    <div onClick={() => sidebar(false)} className="add-list-container">
      <h2>Edit List</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">List Name</label>
        <input
          id="name"
          type="text"
          name="name"
          placeholder="e.g. Grocery List"
          value={formData.name}
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

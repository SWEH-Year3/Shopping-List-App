// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom"; 
// import "../styles/AddItem.css";

// function EditItem() {
//   const { listId } = useParams(); 
//   const navigate = useNavigate(); 

//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     quantity: "",
//     price: "",
//     image: null,
//   });

  
//   useEffect(() => {
    
//     const fetchItemData = () => {
//       try {
        
//         const storedItems = JSON.parse(DB.getItem("items")) || [];   //need the database

        
//         const itemToEdit = storedItems.find((item) => item.id === parseInt(listId));

//         if (itemToEdit) {

//           setFormData({
//             title: itemToEdit.title,
//             description: itemToEdit.description,
//             quantity: itemToEdit.quantity,
//             price: itemToEdit.price,
//             image: itemToEdit.image || null, //if img available
//           });
//         } else {
//           console.error("Item not found");
//         }
//       } catch (error) {
//         console.error("Error fetching item data:", error);
//       }
//     };

//     fetchItemData();
//   }, [listId]); 

//   // handle form input changes
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // handle img upload
//   const handleImageUpload = (e) => {
//     setFormData({ ...formData, image: e.target.files[0] });
//   };

//   // handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Item Updated:", formData);

//     // retrieve the list of items from db
//     const storedItems = JSON.parse(DB.getItem("items")) || [];     // need the database

//     // find the index of the item to be edited
//     const itemIndex = storedItems.findIndex((item) => item.id === parseInt(listId));

//     if (itemIndex !== -1) {
      
//       storedItems[itemIndex] = {
//         ...storedItems[itemIndex],
//         title: formData.title,
//         description: formData.description,
//         quantity: formData.quantity,
//         price: formData.price,
//         image: formData.image,
//       };

      
//       DB.setItem("items", JSON.stringify(storedItems));

//       console.log("Item updated successfully");
//       navigate("/history"); // navigate back to history page
//     } else {
//       console.error("Item not found");
//     }
//   };

//   return (
//     <div className="add-item-container">
//       <h2>Edit Item</h2>
//       <form onSubmit={handleSubmit}>
//         <label>Title</label>
//         <input
//           type="text"
//           name="title"
//           placeholder="Milk"
//           value={formData.title}
//           onChange={handleChange}
//           required
//         />

//         <label>Description</label>
//         <textarea
//           name="description"
//           placeholder="milk"
//           value={formData.description}
//           onChange={handleChange}
//         />

//         <label>Quantity</label>
//         <input
//           type="number"
//           name="quantity"
//           placeholder="2"
//           value={formData.quantity}
//           onChange={handleChange}
//           required
//         />

//         <label>Price</label>
//         <input
//           type="number"
//           name="price"
//           placeholder="50"
//           value={formData.price}
//           onChange={handleChange}
//           required
//         />

//         <label>Upload Image</label>
//         <input type="file" onChange={handleImageUpload} />

//         <button type="submit" className="add-item-button">
//           Update Item
//         </button>
//       </form>
//     </div>
//   );
// }

// export default EditItem;
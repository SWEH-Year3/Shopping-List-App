import React from "react";
import ListCard from "../components/ListCard";

function AddList({sidebar, addList }) {
  return <ListCard sidebar={sidebar} addList={addList} />;
}

export default AddList;

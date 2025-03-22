import React from "react";
import ListCard from "../components/ListCard";

function AddList({ sidebar, addList, addSharedList }) {
  return <ListCard sidebar={sidebar} addList={addList} addSharedList = {addSharedList}/>;
}

export default AddList;

import React from "react";
import ImageApp from "../components/ImageApp";
import { useStateContext } from "../contexts/ContextProvider";

export default function ShortlistNew() {
  const { currentUser } = useStateContext();
  const map1 = new Map();
  const data = [];
  if(currentUser)
  currentUser.shortlisted.forEach((it) => {
    map1.set(it._id, 1);
  });
  if(currentUser)

  currentUser.files.forEach((it) => {
    if (map1.get(it._id) === undefined) data.push(it);
  });
    return (
    <ImageApp base="User" dest="Select" Data={data} />
  )
}

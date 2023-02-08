import React from 'react'
import ImageApp from '../components/ImageApp'
import { useStateContext } from "../contexts/ContextProvider";

export default function Shortlisted() {
    const {currentUser}=useStateContext()
  return (
    <ImageApp base="User" dest="Short" Data={currentUser.shortlisted} />
  )
}

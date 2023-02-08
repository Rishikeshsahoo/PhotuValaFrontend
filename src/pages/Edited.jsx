import React from 'react'
import ImageApp from '../components/ImageApp'
import { useStateContext } from "../contexts/ContextProvider";

export default function Edited() {
    const {currentUser}=useStateContext()
    console.log("curr User",currentUser)
  return (<>
    <ImageApp base="User" dest="Edited" Data={currentUser.edited} />
    {/* <b>Hello World</b> */}
    </>
  )
}

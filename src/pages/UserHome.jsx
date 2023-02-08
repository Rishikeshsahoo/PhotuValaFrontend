import React from 'react'
import ImageApp from '../components/ImageApp'
import { useStateContext } from "../contexts/ContextProvider";

export default function UserHome() {
   const {currentUser} = useStateContext()

  return (<>
    {currentUser && <ImageApp base="User" dest="All" Data={currentUser.files}></ImageApp>}
    </>
  )
}

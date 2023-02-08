import React, { useEffect, useState } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import ClientImageModal from "../components/Client/ClientImageModal"
import ImageApp from "../components/ImageApp";
import {useStateContext} from "../contexts/ContextProvider"
export default function AdminImageSection() {
    const {users} =useStateContext()
  const location = useLocation();
  const [data,setData]=useState(null)
  const [currActive,setCurrActive]=useState(0)
  const navigate=useNavigate();
  console.log("location", location);
  const activeclass="text-white py-2 px-6 capitalize rounded-2xl text-lg"
  const inactiveclass="shadow-md text-slate-600 py-2 px-6 capitalize rounded-2xl text-lg"
  console.log("use effect run hua",users)

  useEffect(()=>{
    users.forEach((item)=>{
        console.log("ran")
        if(location.state===item.username)
        {
            console.log(item.files)
            setData(item)
        }
    })
  },[users])

  console.log("AdminImageSection",data)
  return (
    <div  >
        <div className="flex justify-between p-2 md:ml-6 md:mr-6 relative">
            <div>
      <button
        type="button"
        style={(currActive===0)?{ background: "#03C9D7" }:{ background: "rgb(250 251 251 / var(--tw-bg-opacity))" }}
        className={((currActive===0)?activeclass:inactiveclass)+" mr-5 "}
        onClick={()=>{setCurrActive((prev)=>((prev+1)%2))}}

      >
        All Images
      </button>
      <button
        type="button"
        style={(currActive===1)?{ background: "#03C9D7" }:{ background: "rgb(250 251 251 / var(--tw-bg-opacity))" }}
        className={(currActive===1)?activeclass:inactiveclass}
        onClick={()=>{setCurrActive((prev)=>((prev+1)%2))}}
      >
        Shortlisted Images
      </button>
      </div>
      <button
        type="button"
        style={{ background: "#1E4DB7" }}
        className="text-white mr-5 py-2 px-6 capitalize rounded-2xl text-lg"
        onClick={()=>{navigate("/AdminApp/Upload",{state:location.state})}}
      >
       Upload
      </button>
      </div>
      {data!=null && <ImageApp username={location.state} base={"Admin"} dest={(currActive===0)?"All":"Short"} Data={(currActive==0)?data.files:data.shortlisted}/>}
    </div>
  );
}

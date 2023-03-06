import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import FormComponent from '../components/FormComponent'

export default function UploadFile() {
  const location = useLocation()
  const [loggedin, setLoggedIn]=useState(0)
  const [username, setUsername]=useState("")
  console.log('1',username)
    const navigate=useNavigate()
    useEffect(()=>{
        const token=localStorage.getItem('adminToken')
        axios.get(`${process.env.REACT_APP_LOCALHOST}/admin/protected`,{headers:{Authorization:token}})
        .then((res)=>{
            setLoggedIn(1)
            setUsername(location.state)
            
        })
        .catch((err)=>{
            navigate('/adminlogin')
        })
    },[navigate])
  return (
    <React.Fragment>
        <h1>{username}</h1>
        <FormComponent username={username} path="edited"/>
    </React.Fragment>
  )
}

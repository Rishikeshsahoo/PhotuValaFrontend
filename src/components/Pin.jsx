import React from "react";
import { Button } from "@mui/material";
import axios from "axios";
import { useStateContext } from "../contexts/ContextProvider";
import ClientImageModal from "./Client/ClientImageModal"

const handleDelete = async (img, username, setToggle) => {
  const token = localStorage.getItem("adminToken");

  try {
    await axios.post(
      "https://photuvalatestingserver.onrender.com/admin/deleteimage",
      { idr: img._id, username: username },
      {
        headers: { Authorization: token },
      }
    );
    setToggle((prev) => (prev + 1) % 2);
  } catch (err) {
    console.log(err.message);
  }
};

const handleView=(setShow)=>{
  setShow(true)
}
export const handleShortlist=(img,setToggle)=>{
  const token = localStorage.getItem("token");

  axios.post("https://photuvalatestingserver.onrender.com/users/addimagestofolder/",{folder:[img]},{
    headers: { Authorization: token },
  })
  .then((res)=>{if(res.data.success)setToggle((prev)=>!prev)})
  .catch((err)=>{console.log(err)})
}

const handleRemove=(image,setToggle)=>{
  const token = localStorage.getItem("token");
  // console.log("hi")
  axios.post("https://photuvalatestingserver.onrender.com/users/removeimage/",{image:image},{
    headers: { Authorization: token },
  })
  .then((res)=>{if(res.data.success)setToggle((prev)=>!prev)})
  .catch((err)=>{console.log(err)})
}

const handleEdited=(image,setToggle)=>{
  const token = localStorage.getItem("token");
  // console.log("hi")
  axios.post("https://photuvalatestingserver.onrender.com/users/removeedited/",{folder:[image]},{
    headers: { Authorization: token },
  })
  .then((res)=>{if(res.data.success)setToggle((prev)=>!prev)})
  .catch((err)=>{console.log(err)})
}

function Pin({ pinSize, imgSrc, img, base, dest, username,setShow ,setImage}) {
  const { setToggle } = useStateContext();
  const handleButton = (base, dest) => {
    if (base === "Admin") {
      if (dest === "All") {
        return (
          <button
            style={{ background: "green" }}
            className="text-white py-2 px-3 capitalize rounded-xl text-md"
            onClick={() => {
              handleDelete(img, username, setToggle);
            }}
          >
            Delete Image
          </button>
        );
      } else {
        return <button>Download</button>;
      }
    } else {
      if (dest === "All") {
        return (
          <button
            style={{ background: "green" }}
            className="text-white py-2 px-3 capitalize rounded-xl text-md"
            onClick={()=>handleView(setShow)}
          >
            View
          </button>
        );
      } 
      else if(dest==="Select")
      {
        return <button
            style={{ background: "gold" }}
            className="text-white py-2 px-3 capitalize rounded-xl text-md"
            onClick={()=>{
              handleShortlist(img,setToggle)
              console.log(img)
            }}
          >
            Add to shortlisted
          </button>
      }
      else if(dest==="Edited")
      {
        return <button
            style={{ background: "red" }}
            className="text-white py-2 px-3 capitalize rounded-xl text-md"
            onClick={()=>{
              handleEdited(img,setToggle)
              console.log("img",img)
            }}
          >
            hmm
          </button>
      }
      else {
        return <button onClick={()=>{handleRemove(img,setToggle)}}>Remove</button>;
      }
    }
  };
  const handleClickPin=()=>{
    if(base!=="User" || dest!=="All") return;
    setShow(true)
    setImage(img)
  }
  return (
    <>
    <div style={(base==="User" && dest==="All")?{cursor:"pointer"}:{cursor:"auto"}} className={`pin ${pinSize}`} onClick={handleClickPin}>

      <img src={imgSrc} alt="" className="mainPic" />

      {!(base==="User" &&  dest==="All") &&
        <div className="content">{handleButton(base, dest)}</div>}
    </div>
    </>
  );
}

export default Pin;

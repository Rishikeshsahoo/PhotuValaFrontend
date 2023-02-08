import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";

export default function UserCard2({ userdata }) {
  const navigate = useNavigate();
  console.log(userdata);
  return (
    <Card className="bg-white text-white flex justify-center">
      <Card.Img
        style={{
          height: "350px",
          width:"530px",
          objectFit: "cover",
          filter: "brightness(50%)",
          borderRadius:"10px"
        }}
        src={
          userdata.files.length > 0
            ? userdata.files[0].url
            : "https://wallpaperaccess.com/full/2416004.jpg"
        }
        alt="Card image"
      />
      <Card.ImgOverlay
        style={{ position: "absolute", top: 200, textAlign: "center" }}
      >
        <Typography variant="h5" component="div">
          {userdata.username}
        </Typography>

        <Typography variant="body2">
          Total Images: {userdata.files.length}
          <br />
          Shortlisted Images: {userdata.shortlisted.length}
        </Typography>
        <CardActions
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            margin: "2%",
          }}
        >
          <Button
            variant="contained"
            sx={{ backgroundColor: "#0D4C92", color: "#fff" }}
            onClick={() => {
              navigate("/adminuser", { state: userdata.username });
            }}
            size="small"
          >
            {" "}
            View Profile
          </Button>
        </CardActions>
      </Card.ImgOverlay>
    </Card>
  );
}

{
  /* <CardContent>
       
         
       <Typography variant="h5" component="div">
         {userdata.username}
       </Typography>
      
       <Typography variant="body2">
         Total Images: {userdata.files.length}
         <br />
         Shortlisted Images: {userdata.shortlisted.length} 
       </Typography>
     </CardContent>
     <CardActions style={{display:"flex", flexDirection:"row", justifyContent:"center",margin:"2%"}} >
       <Button variant="contained" sx={{backgroundColor:"#0D4C92", color:"#fff"}} onClick={()=>{navigate('/adminuser',{state:userdata.username})}} size="small"><VisibilityIcon/> View Profile</Button>
     </CardActions> */
}

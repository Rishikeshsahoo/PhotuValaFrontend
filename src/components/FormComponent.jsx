import React from "react";
import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import { array, object, string } from "yup";
import MultipleFileUpload from "../uploads/MultipleFileUpload";
import axios from "axios";
import { useStateContext } from "../contexts/ContextProvider"
export default function FormComponent({ username,path }) {
  const path_main=(path && path==="edited")?"addeditedimages":"addimages"
  const navigate = useNavigate();
  const {setToggle} =useStateContext()
  console.log("path_main",path_main)
  return (
    <React.Fragment>
      
      <Card
        style={{
          width: "100%",
          margin: 0,
          padding: 0,
          backgroundColor: "#FFF",
        }}
      >
        <CardContent style={{ margin: 0 }}>
          <Formik
            initialValues={{ files: [] }}
            validationSchema={object({
              files: array(object({ url: string().required() })),
            })}
            onSubmit={async (value) => {
                // console.log("working ")
              const arr = value.files.map((it) => {
                return { url: it.url };
              });

              try{

              const data = await axios.post(
                `https://photuvalatestingserver.onrender.com/admin/${path_main}`,
                { username: username, files: arr }
                
              );
              console.log("shaandaar",data.data);
              return new Promise((res) =>
                setTimeout(() => {
                  setToggle((prev)=>((prev+1)%2))
                  navigate("/AdminApp/AdminImageSection",{state:username});
                }, 2000)
              );
              }
              catch(err){
                console.log(err)
              }
              
            }}
          >
            {({ values, errors }) => (
              <Form>
                <Grid container spacing={2} direction="column">
                  <MultipleFileUpload name="files" />
                  <Grid item>
                    <Button type="submit">Submit</Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </React.Fragment>
  );
}

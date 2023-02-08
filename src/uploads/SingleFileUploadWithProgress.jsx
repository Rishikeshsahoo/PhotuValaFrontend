import { Grid, LinearProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import FileHeader from "./FileHeader";
import axios from "axios";
export default function SingleFileUploadWithProgress({
  file,
  onDelete,
  onUpload,
}) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    async function upload() {
      const url = await uploadFile(file, setProgress);
      onUpload(file, url);
      console.log("url: ", url);
    }
    upload();
  }, []);
  return (
    <Grid item>
      <FileHeader file={file} onDelete={onDelete} />
      <LinearProgress variant="determinate" value={progress} />
    </Grid>
  );
}

async function uploadFile(file, setProgress) {
  let url2 = await axios.get("http://localhost:4000/admin/getUrl");
  console.log(url2.data);
  url2 = url2.data;

 
  const formData = new FormData();
  formData.append("selectedFile", file);
  
  try {
    const fileData = new FormData();
    fileData.append('file', file);
    let config = {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: function (progressEvent) {
        var percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        console.log(percentCompleted);
        setProgress(percentCompleted)
      },
    };
  
    const response=await axios.put(url2,file,config)
  } catch (error) {
    console.log(error);
  }

  const imageUrl = url2.split("?")[0];
  console.log("url2", imageUrl);

  return imageUrl;

 
}

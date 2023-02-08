import { Grid } from "@mui/material";
import { useField } from "formik";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import SingleFileUploadWithProgress from "./SingleFileUploadWithProgress";
import UploadError from "./UploadError";

export default function MultipleFileUpload({ name,path }) {
  const [_, __, helper] = useField(name);
  console.log("rendred");
  const [files, setFiles] = useState([]);

  const onDelete = (file) => {
    setFiles((curr) => {
      return curr.filter((f) => f.file !== file);
    });
    
  };

  useEffect(() => {
    helper.setValue(files);
  }, [files]);

  const onUpload = (file, url) => {
    setFiles((curr) => {
      return curr.map((f) => {
        if (f.file === file) {
          return { ...f, url };
        }
        return f;
      });
    });
  };
  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    // Do something with the files
    const alteredAccepted = acceptedFiles.map((file) => {
      // console.log(file)
      return { file, errors: [] };
    });
    setFiles((curr) => [...curr, ...alteredAccepted, ...rejectedFiles]);
  }, []);

  const { getRootProps, getInputProps , isDragActive} = useDropzone({
    onDrop,
    accept: {  "image/*": [] },
    maxSize:100*1024*1024
    // 300KB
  });
  return (
    <React.Fragment>
      <Grid   style={{height:"10rem" , padding:0 }} item  >
        <div  style={{ border:"3px dotted #9C9EFE", height:"10rem", backgroundColor:"#1976d2" , width:"100%" ,display:"flex", flexDirection:"column", justifyContent:"center"}} {...getRootProps()}>
          <input  {...getInputProps()}  />
          {!isDragActive ?
          <p className="dnd-text">Drag 'n' drop some files here, or click to select files</p>:
          <p className="dnd-text">Drop it like its hot</p>}

        </div>
      </Grid>

      {files.map((fileWrapper, idx) => {
        return (
          <Grid item>
            {fileWrapper.errors.length ? (
              <UploadError file={fileWrapper.file} errors={fileWrapper.errors} onDelete={onDelete} />
            ) : (
              <SingleFileUploadWithProgress
                onUpload={onUpload}
                onDelete={onDelete}
                file={fileWrapper.file}
              />
            )}
          </Grid>
        );
      })}
      {/* {JSON.stringify(files, null, 4)} */}
    </React.Fragment>
  );
}

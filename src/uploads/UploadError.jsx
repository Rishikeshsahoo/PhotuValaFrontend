import { LinearProgress, linearProgressClasses, styled, Typography } from '@mui/material';
import React from 'react'
import FileHeader from './FileHeader'

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: "red",
    }
  }));
  

export default function UploadError({file,onDelete,errors}) {
  return (
    <React.Fragment>
        <FileHeader file={file} onDelete={onDelete}/>
        <BorderLinearProgress variant="determinate"  value={100}/>
        {errors.map((it)=>{
            return (<div><Typography color="error">{it.message}</Typography></div>)
        })}
    </React.Fragment>
  )
}

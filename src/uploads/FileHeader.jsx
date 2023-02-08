import { Button, Grid } from '@mui/material'
import React from 'react'

export default function FileHeader({file,onDelete}) {
  return (
    <Grid container justifyContent="space-between" alignItems="center" flexWrap="wrap">
        <Grid item>
            {(file.name).slice(0,20)}
        </Grid>
        <Grid item>
            <Button size="small" onClick={()=>{onDelete(file)}}>Delete</Button>
        </Grid>
    </Grid>
  )
}

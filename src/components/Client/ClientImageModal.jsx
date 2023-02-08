import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { imageListClasses } from '@mui/material';
import { handleShortlist } from '../Pin';
import { useStateContext } from "../../contexts/ContextProvider";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius:"10px"
};

export default function BasicModal({show,setShow,image}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setShow(true);
  const handleClose = () => setShow(false);
  const {setToggle}=useStateContext();
  console.log(image)
  return (
    <div>
      <Modal
        open={show}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className='flex flex-row w-100 justify-center' >
            <img style={{width:"500px",height:"500px" ,objectFit:"contain"}} src={(image && image.url!==null)?image.url:""}/>
          </div>
          <br/>
          <div className='w-100 flex justify-center'>
          <button style={{background:"green"}} className='py-2 px-3 text-md text-white rounded-xl' onClick={()=>handleShortlist(image,setToggle)}>Add to shortlisted</button>

          <button style={{background:"blue"}} className='py-2 px-3 text-md ml-3 text-white rounded-xl' onClick={()=>setShow(false)}>Close</button>
          </div>


        </Box>

      </Modal>
    </div>
  );
}

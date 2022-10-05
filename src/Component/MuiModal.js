import * as React from 'react';
import Box from '@mui/material/Box';
import "../index.css";
import Button from '@mui/material/Button';
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import Typography from '@mui/material/Typography';
import  Modal from '@mui/material/Modal';



const style = {
  position: 'absolute',
  top: '47%',
  left: '47%',
  transform: 'translate(-50%, -50%)',
  width: 200,
  bgcolor: 'background.paper',
  border: '2px solid #fff',
  boxShadow: 24,
  p: 4,
  borderRadius: 3
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const [ category , setCategory ] = React.useState(1);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (value) => {
    setCategory(value)
    setOpen(false)
  }

  return (
    <div>
      <Button  size="small" variant="contained" onClick={handleOpen}>
      <div className="star">
        {category==1 && <><span className='starYellow' ><AiFillStar /> </span><span><AiOutlineStar /></span> <AiOutlineStar /> </>  }
        {category==2 && <><span className='starYellow' ><AiFillStar /> </span><span  className='starYellow' ><AiFillStar /></span> <AiOutlineStar /> </>  }
        {category==3 && <><span className='starYellow' ><AiFillStar /> </span><span  className='starYellow' ><AiFillStar /></span  ><span  className='starYellow' ><AiFillStar /> </span> </>  }
      </div>
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <div className="Modal" >
        <h3>Difficulty</h3>
        <Button onClick={() => handleChange(1)}  size="small" > <p><span className='starYellow' ><AiFillStar /> </span><span><AiOutlineStar /></span> <AiOutlineStar /> Easy</p></Button>
        <Button onClick={() => handleChange(2)}  size="small" > <p><span className='starYellow' ><AiFillStar /> </span> <span className='starYellow' ><AiFillStar /> </span><AiOutlineStar />medium  </p></Button>
        <Button onClick={() => handleChange(3)} size="small" ><p><span className='starYellow' ><AiFillStar /> </span><span className='starYellow' ><AiFillStar /> </span> <span className='starYellow' ><AiFillStar /> </span> hard</p></Button>
      </div>
        </Box>
      </Modal>
    </div>
  );
}

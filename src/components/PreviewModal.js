import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({goalObject, handleSubmit, checkForErrors}) {
  let {name, description, bet, partner, email, deadline} = goalObject;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(checkForErrors().every(val => val===false))
  };
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen} variant="contained">Done</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          Please check that everything looks right. You will not be able to edit the Goal after submitting!
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Title: {name}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Description: {description}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Losing Bet: {bet}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Bet partner: {partner}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Email: {email}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            deadline: {deadline}
          </Typography>
          <Button onClick={handleClose} color="warning" variant="contained">
            Back to Edit
          </Button>
          <Button onClick={handleSubmit} variant="contained">
            Submit
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

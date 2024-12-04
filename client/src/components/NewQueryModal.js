import React, { useState } from 'react'
import { Box } from "@mui/system";
import { Button, Typography, TextField, Modal, Paper } from "@mui/material";
import { createNewMessage, createConversation } from '../utils/api.js'
import { styled } from "@mui/material/styles";

const StyledPaper = styled(Paper)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  backgroundColor: '#D7D3BF',
  boxShadow: theme.shadows[5],
  padding: theme.spacing(4),
  outline: 'none',
  borderRadius: theme.shape.borderRadius,
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  '& .MuiOutlinedInput-root': {
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
}));

export const NewQueryModal = ({ open, handleClose, convData, isAgent, custId, setUpdate, socket }) => {
  const [msg, setMsg] = useState("");

  const handleSearch = async () => {
    // ... (keep the existing logic)
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="new-query-modal"
      aria-describedby="create-new-query"
    >
      <StyledPaper>
        <Typography id="new-query-modal" variant="h6" component="h2" gutterBottom>
          Create Query
        </Typography>
        <StyledTextField
          fullWidth
          label="Enter Message"
          variant="outlined"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleSearch}
          sx={{ mt: 2 }}
        >
          Create
        </Button>
      </StyledPaper>
    </Modal>
  );
}

export default NewQueryModal;


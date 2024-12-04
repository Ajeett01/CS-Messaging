import React, { useState } from 'react'
import { Box } from "@mui/system";
import { Button, Grid, Typography, TextField, Modal, Paper, List, ListItem, ListItemText, Divider } from "@mui/material";
import { searchTextApi } from '../utils/api.js'
import { styled } from "@mui/material/styles";

const StyledPaper = styled(Paper)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  maxHeight: '80vh',
  overflowY: 'auto',
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

export const SearchModal = ({ open, handleClose, convData, isAgent, setSelectedConvo }) => {
  const [searchText, setSearchText] = useState("");
  const [chatResults, setChatResults] = useState([]);
  const [messageResults, setMessageResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = async () => {
    // ... (keep the existing logic)
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="search-modal"
      aria-describedby="search-conversations-and-messages"
    >
      <StyledPaper>
        <Typography id="search-modal" variant="h6" component="h2" gutterBottom>
          Search
        </Typography>
        <Box display="flex" alignItems="center" mb={2}>
          <StyledTextField
            fullWidth
            label="Search"
            variant="outlined"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSearch}
            sx={{ ml: 1 }}
          >
            Search
          </Button>
        </Box>

        {showResults && (
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Chat Results
            </Typography>
            <List>
              {chatResults.length > 0 ? (
                chatResults.map((item, index) => (
                  <ListItem
                    key={index}
                    button
                    onClick={() => {
                      if (item.agentId !== "empty") {
                        setSelectedConvo({ conversation: item });
                        handleClose();
                      }
                    }}
                  >
                    <ListItemText primary={isAgent ? item.custId : item.agentId} />
                  </ListItem>
                ))
              ) : (
                <ListItem>
                  <ListItemText primary="No Results" />
                </ListItem>
              )}
            </List>

            <Divider sx={{ my: 2 }} />

            <Typography variant="subtitle1" gutterBottom>
              Message Results
            </Typography>
            <List>
              {messageResults.length > 0 ? (
                messageResults.map((item, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={item.isAgent ? item.conversationId.agentId : item.conversationId.custId}
                      secondary={item.text}
                    />
                  </ListItem>
                ))
              ) : (
                <ListItem>
                  <ListItemText primary="No Results" />
                </ListItem>
              )}
            </List>
          </Box>
        )}
      </StyledPaper>
    </Modal>
  );
}

export default SearchModal;


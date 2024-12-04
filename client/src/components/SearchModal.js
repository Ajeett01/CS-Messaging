import React, { useState } from 'react'
import { Box } from "@mui/system";
import { Button, Grid, Typography, TextField, Modal } from "@mui/material";
import { searchTextApi } from '../utils/api.js'

export const SearchModal = ({ open, handleClose, convData, isAgent, setSelectedConvo }) => {
    const [searchText, setSearchText] = useState("");
    const [chatResults, setChatResults] = useState([]);
    const [messageResults, setMessageResults] = useState([]);
    const [showResults, setShowResults] = useState(false);

    const handleSearch = async () => {
        setChatResults([])
        setMessageResults([])
        var res = convData.filter(obj => Object.values(obj).some(val => val.toString().toLowerCase().includes(searchText.toLowerCase())));

        const apiRes = await searchTextApi({ searchText: searchText })
        console.log(apiRes)

        if (apiRes && apiRes.length !== 0) {
            setMessageResults(apiRes)
        }
        setChatResults(res)
        setShowResults(true)
    }

    return (
      <>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Search Box
            </Typography>
            <Box>
              <Box
                display={"flex"}
                flexDirection={"row"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                {
                  <TextField
                    id="filled-search"
                    label="Search"
                    type="search"
                    variant="filled"
                    size={"small"}
                    value={searchText}
                    sx={{
                      width: "70%",
                    }}
                    onChange={(e) => {
                      setSearchText(e.target.value);
                    }}
                  />
                }
                <Button
                  variant="contained"
                  sx={{
                    ml: 2,
                  }}
                  onClick={() => {
                    handleSearch();
                  }}
                >
                  Search
                </Button>
              </Box>

              {showResults ? (
                <>
                  <Grid
                    container
                    spacing={0}
                    direction="column"
                    justifyContent="flex-start"
                    sx={{
                      height: "100%",
                    }}
                  >
                    <Grid item>
                      <Box
                        borderBottom="1px solid #ccc"
                        marginTop={1}
                        padding="8px"
                      >
                        <Typography variant="h7">Chat</Typography>
                      </Box>
                      {chatResults.length !== 0 ? (
                        <>
                          {chatResults.map((item, index) => (
                            <>
                              <Box
                                sx={{
                                  "&:hover": {
                                    backgroundColor: "#e1e1e18f",
                                  },
                                }}
                                onClick={() => {
                                  // console.log("item",{userData:item})
                                  if (item.agentId === "empty") {
                                    //   handleClickOpenDia()
                                  } else {
                                    setSelectedConvo({ conversation: item });
                                    handleClose();
                                  }
                                }}
                              >
                                <Typography
                                  variant="body2"
                                  sx={{
                                    ml: 1,
                                    mt: 2,
                                  }}
                                >
                                  {isAgent ? item.custId : item.agentId}
                                </Typography>
                              </Box>
                            </>
                          ))}
                        </>
                      ) : (
                        <>
                          <Typography variant="caption">No Results</Typography>
                        </>
                      )}
                    </Grid>

                    <Grid item>
                      <Box
                        borderBottom="1px solid #ccc"
                        marginTop={1}
                        padding="8px"
                      >
                        <Typography variant="h7">Messages</Typography>
                      </Box>
                      {messageResults.length !== 0 ? (
                        <>
                          {messageResults.map((item, index) => (
                            <>
                              <Box>
                                <Typography>
                                  {item.isAgent
                                    ? item.conversationId.agentId
                                    : item.conversationId.custId}
                                </Typography>

                                <Typography variant="caption">
                                  {item.text}
                                </Typography>
                              </Box>
                            </>
                          ))}
                        </>
                      ) : (
                        <>
                          <Typography variant="caption">No Results</Typography>
                        </>
                      )}
                    </Grid>
                  </Grid>
                </>
              ) : null}
            </Box>
          </Box>
        </Modal>
      </>
    );
}
export default SearchModal

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
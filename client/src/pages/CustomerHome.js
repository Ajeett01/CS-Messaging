import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { CircularProgress, Grid, Typography, Button, TextField } from "@mui/material";
import { getCustomersConvos } from "../utils/api";
import { Box } from "@mui/system";
import ConvSideBar from "../components/ConvSideBar.js";
import ConvDetails from "../components/ConvDetails.js";
import NewQueryModal from "../components/NewQueryModal.js";
import SearchModal from "../components/SearchModal.js";
import { io } from "socket.io-client";
import axios from "axios";

export const CustomerHome = () => {
  const [selectedConvo, setSelectedConvo] = useState({});
  // const [convData, setConvData] = useState(data);
  const [convData1, setConvData1] = useState([]);
  const location = useLocation();
  const custId = location.state.custId;
  const [update, setUpdate] = useState(0);
  const socket = useRef();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [open1, setOpen1] = React.useState(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);
  useEffect(() => {
    async function getConvos() {
      const data = await getCustomersConvos(custId);
      if (data.length !== 0) {
        setConvData1(data);
      }
    }

    getConvos();
    // eslint-disable-next-line
  }, [update]);

  useEffect(() => {
    socket.current = io(axios.defaults.baseURL);
    socket.current.emit("addUser", custId);
  }, [custId]);

  const handleNewQueryCreation = () => {
    handleOpen();
  };
  return (
    <Box
      sx={{
        flexGrow: 1,
      }}
    >
      <Grid container spacing={0}>
        <Grid item xs={4}>
          <Box borderBottom="1px solid #ccc" padding="8px 20px">
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <Typography variant="h6"> {"Customer: " + custId} </Typography>
              </Grid>

              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNewQueryCreation}
                >
                  Create New Query
                </Button>
              </Grid>
            </Grid>
          </Box>
          <Grid
            container
            spacing={0}
            direction="column"
            justifyContent="flex-start"
            sx={{
              height: "100%",
            }}
          >
            <Box
              sx={{
                p: 0.5,
                "&:hover": {
                  cursor: "pointer",
                },
              }}
              onClick={() => {
                handleOpen1();
              }}
            >
              {
                <TextField
                  id="filled-search"
                  label="Search"
                  type="search"
                  variant="filled"
                  fullWidth
                />
              }
            </Box>
            <Grid item xs={4}>
              {convData1.length !== 0 ? (
                <>
                  <ConvSideBar
                    data={convData1}
                    setSelectedConvo={setSelectedConvo}
                    isAgent={false}
                  />
                </>
              ) : (
                <CircularProgress />
              )}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={8}>
          <ConvDetails convo={selectedConvo} isAgent={false} socket={socket} />
        </Grid>
      </Grid>
      <NewQueryModal
        open={open}
        convData={convData1}
        handleClose={handleClose}
        isAgent={false}
        custId={custId}
        setUpdate={setUpdate}
        socket={socket}
      />

      <SearchModal
        open={open1}
        convData={convData1}
        handleClose={handleClose1}
        setSelectedConvo={setSelectedConvo}
        isAgent={false}
      />
    </Box>
  );
};
export default CustomerHome;

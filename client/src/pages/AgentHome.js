import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { CircularProgress, Grid, Typography } from "@mui/material";
import { getAgentConvos, getAgentConvosUnalloted } from "../utils/api";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";
import ConvSideBar from "../components/ConvSideBar.js";
import ConvDetails from "../components/ConvDetails.js";
import SearchModal from "../components/SearchModal.js";
import { io } from "socket.io-client";
import axios from "axios";

export const AgentHome = () => {
  const [selectedConvo, setSelectedConvo] = useState({});
  const [convData1, setConvData1] = useState([]);
  const [convDataUnalloted, setConvDataUnalloted] = useState([]);
  const location = useLocation();
  const agentId = location.state.agentId;
  const [update, setUpdate] = useState(0);
  const [customerData, setCustomerData] = useState([]);
  const [customerList, setCustomerList] = useState([]);

  // eslint-disable-next-line
  const [newAlloted, setNewAlloted] = useState(null);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const socket = useRef();

  useEffect(() => {
    async function getConvos() {
      const data = await getAgentConvos(agentId);
      if (data.length !== 0) {
        setConvData1(data);
      }
    }

    getConvos();
    // eslint-disable-next-line
  }, [update]);

  useEffect(() => {
    socket.current = io(axios.defaults.baseURL);
    socket.current.on("getNewQuery", (data) => {
      console.log("getNewQuery", data);
      setConvDataUnalloted((prevState) => {
        var newObj = {
          _id: data.conversationId,
          agentId: "empty",
          custId: data.custId,
          latestMsg: {
            text: data.text,
          },
          isUrgent: data.isUrgent,
        };
        return [...prevState, newObj];
      });
    });
  }, [newAlloted]);

  useEffect(() => {
    async function getConvosUnalloted() {
      const data = await getAgentConvosUnalloted(agentId);
      if (data.length !== 0) {
        setConvDataUnalloted(data);
      }
    }

    getConvosUnalloted();
    // eslint-disable-next-line
  }, [update]);

  useEffect(() => {
    socket.current.emit("addUser", agentId);
  }, [agentId]);




  return (
    <>
      <Grid container spacing={0}>
        <Grid item xs={4}>
          <Box borderBottom="1px solid #ccc" padding="8px 20px">
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <Typography variant="h6"> {"Agent: " + agentId} </Typography>
              </Grid>
              <Grid item></Grid>
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
                handleOpen();
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
            <Grid item>
              <Box
                borderBottom="1px solid #ccc"
                marginTop={1}
                padding="8px 20px"
              >
                <Typography variant="h7">Alloted Queries</Typography>
              </Box>
              {convData1.length !== 0 ? (
                <>
                  <ConvSideBar
                    data={convData1}
                    selectedConvo={selectedConvo}
                    setSelectedConvo={setSelectedConvo}
                    isAgent={true}
                    update={setUpdate}
                    setCustomerList = {setCustomerList}
                    setCustomerData = {setCustomerData}
                    customerList = {customerList}
                    customerData = {customerData}
                  />
                </>
              ) : (
                <CircularProgress />
              )}
            </Grid>

            <Grid item>
              <Box borderBottom="1px solid #ccc" padding="8px 20px">
                <Typography variant="h7">Un Alloted Queries</Typography>
              </Box>
              {convDataUnalloted.length !== 0 ? (
                <>
                  <ConvSideBar
                    data={convDataUnalloted}
                    setSelectedConvo={setSelectedConvo}
                    isAgent={true}
                    update={setUpdate}
                    setCustomerList = {setCustomerList}
                    setCustomerData = {setCustomerData}
                    customerList = {customerList}
                    customerData = {customerData}
                  />
                </>
              ) : (
                <CircularProgress />
              )}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={8} borderLeft="1px solid #ccc">
          <ConvDetails
            convo={selectedConvo}
            setSelectedConvo={setSelectedConvo}
            isAgent={true}
            update={setUpdate}
            socket={socket}
          />
        </Grid>
      </Grid>
      <SearchModal
        open={open}
        convData={convData1}
        handleClose={handleClose}
        setSelectedConvo={setSelectedConvo}
        isAgent={true}
      />
    </>
  );
};
export default AgentHome;

import { Button, Grid, Typography, TextField , Paper} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState, useRef } from "react";
import SendIcon from "@mui/icons-material/Send";
import { EachMessage } from "./EachMessage.js";
import axios from "axios";
import { unAllot } from '../utils/api'
import { styled } from "@mui/material/styles";
// import { io } from "socket.io-client";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  margin: theme.spacing(2),
  backgroundColor: theme.palette.background.default,
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
}));

export default function ConvDetails({
  convo,
  isAgent,
  update,
  setSelectedConvo,
  socket,
}) {
  const temp = Object.keys(convo).length !== 0 ? convo.conversation : {};
  // console.log("selectedConvo", temp)
  const [currentChat, setCurrentChat] = useState(temp);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);

  const scrollRef = useRef();

  useEffect(() => {
    const temp = Object.keys(convo).length ? convo.conversation : {};
    // console.log("temp", temp)
    setCurrentChat(temp);
  }, [convo]);

  const userId = isAgent ? currentChat.agentId : currentChat.custId;

  useEffect(() => {
    // socket.current = io(axios.defaults.baseURL);
    if (socket.current !== undefined) {
      socket.current.on("getMessage", (data) => {
        console.log(data);
        setArrivalMessage({
          sender: data.senderId,
          text: data.text,
          createdAt: Date.now(),
          isAgent: data.senderId.includes("A") ? true : false,
        });
      });
    } // eslint-disable-next-line
  }, [arrivalMessage]);

  useEffect(() => {
    arrivalMessage &&
      (currentChat.agentId === arrivalMessage.sender ||
        currentChat.custId === arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  // useEffect(() => {
  //     socket.current.emit("addUser", userId);
  // }, [userId]);

  // useEffect(() => {
  //   dispatch(getPostDetails(id));
  //   dispatch(getComments(id));
  // }, [dispatch, id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        // console.log(currentChat?._id)
        const res = await axios.get("/api/messages/" + currentChat?._id);

        // console.log(res.data)
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async () => {
    // e.preventDefault();
    const message = {
      text: newMessage,
      conversationId: currentChat._id,
      isAgent: userId === currentChat.agentId ? true : false,
    };

    const receiverId =
      userId === currentChat.agentId ? currentChat.custId : currentChat.agentId;
    console.log({
      senderId: userId,
      receiverId,
      text: newMessage,
    });
    if (socket.current !== undefined) {
      socket.current.emit("sendMessage", {
        senderId: userId,
        receiverId,
        text: newMessage,
      });
    }
    try {
      const res = await axios.post("/api/messages", message);
      console.log("res", res);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleUnAllotClick = async () => {
    await unAllot({ conversationId: currentChat._id })
    update(Math.random);
    setSelectedConvo({});
    setCurrentChat({});
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor:"#D7D3BF" }}>
      {Object.keys(currentChat).length ? (
        <>
          <StyledPaper elevation={3}>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <Typography variant="h6" color="primary">
                  {isAgent
                    ? convo.conversation.custId
                    : convo.conversation.agentId}
                </Typography>
              </Grid>
              <Grid item>
                {isAgent && (
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleUnAllotClick}
                  >
                    UnAllot
                  </Button>
                )}
              </Grid>
            </Grid>
          </StyledPaper>
          <Box sx={{ flexGrow: 1, overflowY: 'auto', padding: 2 }}>
            {messages.map((item, index) => (
              <div ref={scrollRef} key={index}>
                <EachMessage
                  _id={userId}
                  type={index}
                  msg={item.text}
                  senderCheck={
                    (item.isAgent && userId === currentChat.agentId) ||
                    (!item.isAgent && userId === currentChat.custId)
                  }
                />
              </div>
            ))}
          </Box>
          <Box sx={{ padding: 2, backgroundColor: 'background.paper' }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs>
                <StyledTextField
                  fullWidth
                  multiline
                  maxRows={3}
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  variant="outlined"
                />
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  endIcon={<SendIcon />}
                >
                  Send
                </Button>
              </Grid>
            </Grid>
          </Box>
        </>
      ) : (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Typography variant="h5" color="textSecondary">
            Select a Chat to get started
          </Typography>
        </Box>
      )}
    </Box>
  );
}

import React from 'react'
import { Typography, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

const MessageContainer = styled('div')(({ theme, senderCheck }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: senderCheck ? "flex-end" : "flex-start",
  maxWidth: senderCheck ? "100%" : "50%",
  marginBottom: theme.spacing(1),
}));

const MessageBubble = styled(Paper)(({ theme, senderCheck }) => ({
  padding: theme.spacing(1.5),
  boxSizing: "border-box",
  wordWrap: "break-word",
  minWidth: "200px",
  maxWidth: "400px",
  borderRadius: senderCheck ? "20px 20px 0 20px" : "20px 20px 20px 0",
  backgroundColor: senderCheck ? theme.palette.primary.main : theme.palette.secondary.main,
  color: theme.palette.getContrastText(senderCheck ? theme.palette.primary.main : theme.palette.secondary.main),
  boxShadow: theme.shadows[2],
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: theme.shadows[4],
  },
}));

export const EachMessage = ({ _id, type, msg, isAgent, currentChat, senderCheck }) => {
  return (
    <MessageContainer senderCheck={senderCheck}>
      <MessageBubble elevation={1} senderCheck={senderCheck}>
        <Typography variant="body1">{msg}</Typography>
      </MessageBubble>
    </MessageContainer>
  );
}

export default EachMessage;


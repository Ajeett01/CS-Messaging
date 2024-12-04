import React, { useState, useEffect } from "react";
import { Grid, Typography, Avatar, Popover, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { Box } from "@mui/system";
import { useLocation } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { allotQuery } from "../utils/api";

export default function MessageCard({ item, con, setSelectedConvo, isAgent, update, selectedConvo, customerData }) {
  const [bgColor, setBgColor] = useState(false);
  const location = useLocation();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    if (selectedConvo && Object.keys(selectedConvo).length !== 0) {
      if (selectedConvo.conversation._id !== item._id) {
        setBgColor(false);
      } else {
        setBgColor(true);
      }
    } // eslint-disable-next-line
  }, [selectedConvo]);

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const [diaOpen, setDiaOpen] = React.useState(false);

  const handleClickOpenDia = () => {
    setDiaOpen(true);
  };

  const handleCloseDia = () => {
    setDiaOpen(false);
  };

  const handleAllotQuery = async () => {
    const res = await allotQuery({ conversationId: item._id, agentId: location.state.agentId });
    if (res) {
      handleCloseDia();
      update(Math.random());
    }
  };

  const showUserDetails = (item) => {
    const foundItem = customerData.find((obj) => obj?.custId === item.custId);

    return foundItem !== undefined ? (
      <>
        <Typography variant="body2">{"CustomerId: " + foundItem.custId}</Typography>
        <Typography variant="body2">{"Address: " + foundItem.address}</Typography>
        <Typography variant="body2">{"Phone: " + foundItem.phone}</Typography>
      </>
    ) : (
      <Typography variant="body2">Loading</Typography>
    );
  };

  return (
    <Box>
      <Box
        padding="1rem"
        sx={{
          "&:hover": { backgroundColor: bgColor ? null : "#D7D3BF" },
          backgroundColor: bgColor ? "#d7e3fc" : "white",
          border: bgColor ? "2px solid #1976d2" : "1px solid #e0e0e0",
          borderRadius: "8px",
          marginBottom: "10px",
          boxShadow: bgColor ? "0px 4px 12px rgba(0, 0, 0, 0.1)" : "none",
          transition: "all 0.3s ease",
          cursor: "pointer",
        }}
        onClick={() => {
          if (item.agentId === "empty") {
            handleClickOpenDia();
          } else {
            setSelectedConvo({ conversation: item });
          }
        }}
      >
        <Grid container >
          <Grid item flexGrow="1">
            <Box>
              <Grid container>
                <Grid container flexWrap="nowrap" justifyContent="space-between">
                  <Grid item>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        paddingLeft: 0,
                      }}
                    >
                      <Avatar
                        fontSize={"small"}
                        aria-owns={open ? "mouse-over-popover" : undefined}
                        aria-haspopup="true"
                        onMouseEnter={handlePopoverOpen}
                        onMouseLeave={handlePopoverClose}
                        sx={{
                          backgroundColor: "#1976d2",
                          color: "white",
                          fontSize: "16px",
                          width: "40px",
                          height: "40px",
                        }}
                      >
                        <AccountCircleIcon />
                      </Avatar>
                      {isAgent && (
                        <Popover
                          id="mouse-over-popover"
                          sx={{
                            pointerEvents: "none",
                          }}
                          open={open}
                          anchorEl={anchorEl}
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left",
                          }}
                          transformOrigin={{
                            vertical: "top",
                            horizontal: "left",
                          }}
                          onClose={handlePopoverClose}
                          disableRestoreFocus
                        >
                          <Box
                            sx={{
                              p: 1,
                              maxWidth: "300px",
                              backgroundColor: "#f9f9f9",
                              borderRadius: "8px",
                              boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
                            }}
                          >
                            <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                              User Details
                            </Typography>
                            {showUserDetails(item)}
                          </Box>
                        </Popover>
                      )}
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          ml: 2,
                        }}
                      >
                        <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
                          {!isAgent ? (
                            <Typography variant="body2">{item.agentId !== "empty" ? item.agentId : "Unalloted Query"}</Typography>
                          ) : (
                            <Typography variant="body2">{item.custId}</Typography>
                          )}
                        </Typography>
                        <Box>
                          {item.latestMsg === null || item.latestMsg === undefined ? (
                            <Typography variant="caption" sx={{ color: "#757575" }}>
                              Msg Not Available
                            </Typography>
                          ) : (
                            <>
                              <Typography variant="caption" sx={{ color: "#757575" }}>
                                {item.latestMsg.isAgent ? item.agentId : item.custId}
                                {": "}
                              </Typography>
                              <Typography variant="caption" sx={{ color: "#424242" }}>
                                {item.latestMsg.text}
                              </Typography>
                            </>
                          )}
                        </Box>
                      </Box>
                      {item.isUrgent && (
                        <Box
                          sx={{
                            width: 70,
                            height: 24,
                            backgroundColor: "#d32f2f",
                            color: "white",
                            textAlign: "center",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "12px",
                            ml: 8,
                          }}
                        >
                          <Typography variant="overline" sx={{ fontSize: "10px" }}>
                            Urgent
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Dialog
        open={diaOpen}
        onClose={handleCloseDia}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Alert!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {isAgent ? "Do you want to allot this query to you" : "This Query is Unalloted. Please Wait!!"}
          </DialogContentText>
        </DialogContent>
        {isAgent && (
          <DialogActions>
            <Button onClick={handleCloseDia} color="secondary">
              Disagree
            </Button>
            <Button onClick={() => handleAllotQuery()} color="primary" autoFocus>
              Agree
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </Box>
  );
}

import React from "react";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useHistory } from "react-router-dom";

export const Home = () => {
  const theme = useTheme();
  let history = useHistory();

  function handleSubmitAgent() {
    history.push("/select-agent");
  }

  function handleSubmitCustomer() {
    history.push("/select-customer");
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        width: "100vw",
        height: "100vh",
        background: "linear-gradient(135deg, #ece9e6, #ffffff)",
        animation: "background-move 10s infinite alternate",
        "@keyframes background-move": {
          from: { backgroundPosition: "0% 0%" },
          to: { backgroundPosition: "100% 100%" },
        },
      }}
    >
      <Box
        display="flex"
        borderRadius={3}
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        boxShadow="0px 10px 30px rgba(0, 0, 0, 0.2)"
        sx={{
          width: 420,
          height: 420,
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(255, 255, 255, 0.75)",
          padding: "2rem",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: theme.palette.primary.main,
            marginBottom: "1rem",
          }}
        >
          Select User Type
        </Typography>
        <Button
          variant="contained"
          endIcon={<ArrowForwardIcon />}
          sx={{
            marginTop: 2,
            width: "80%",
            background: "linear-gradient(to right, #ff7e5f, #feb47b)",
            "&:hover": {
              background: "linear-gradient(to right, #feb47b, #ff7e5f)",
            },
            transition: "background 0.5s ease",
          }}
          onClick={handleSubmitAgent}
        >
          Agent
        </Button>
        <Button
          variant="contained"
          endIcon={<ArrowForwardIcon />}
          sx={{
            marginTop: 2,
            width: "80%",
            background: "linear-gradient(to right, #6a11cb, #2575fc)",
            "&:hover": {
              background: "linear-gradient(to right, #2575fc, #6a11cb)",
            },
            transition: "background 0.5s ease",
          }}
          onClick={handleSubmitCustomer}
        >
          Customer
        </Button>
      </Box>
    </Box>
  );
}

export default Home;

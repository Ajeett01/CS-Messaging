import React, { useEffect } from "react";
import { CircularProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useTheme } from "@mui/material/styles";
import { DropDown } from "../components/Dropdown";
import Button from "@mui/material/Button";                      
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useHistory } from "react-router-dom";
import { getAllCustomers } from "../utils/api";

export const CustomerSelection = () => {
  const theme = useTheme();
  let history = useHistory();
  const [agentIds, setAgentIds] = React.useState([]);
  const [selectedId, setSelectedId] = React.useState("");

  useEffect(() => {
    async function getData() {
      const data = await getAllCustomers();
      if (data.length !== 0) {
        var arr = data.map((e) => e.custId);
        setAgentIds(arr);
      }
    }
    getData();
  }, []);

  function handleSubmit() {
    console.log(selectedId);
    history.push(`/customer-home/${selectedId}`, { custId: selectedId });
  }
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        width: "100vw",
        height: "100vh",
        background: "linear-gradient(135deg, #ece9e6, #ffffff)", // Gradient background
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        borderRadius={3}
        boxShadow="0px 10px 30px rgba(0, 0, 0, 0.2)" // Shadow for floating effect
        sx={{
          width: 450,
          height: 450,
          backgroundColor: "rgba(255, 255, 255, 0.9)", // Semi-transparent white for glass effect
          padding: "2rem",
          backdropFilter: "blur(5px)", // Glassmorphism
          border: "1px solid rgba(255, 255, 255, 0.6)", // Subtle border
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: theme.palette.primary.main, // Themed color
            marginBottom: "1.5rem",
          }}
        >
          Select a Customer
        </Typography>

        {agentIds.length !== 0 ? (
          <DropDown
            label={"CustId"}
            menuItems={agentIds}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
          />
        ) : (
          <CircularProgress
            sx={{
              color: theme.palette.primary.main,
              animation: "spin 1.5s linear infinite",
              "@keyframes spin": {
                from: { transform: "rotate(0deg)" },
                to: { transform: "rotate(360deg)" },
              },
            }}
          />
        )}

        <Button
          variant="contained"
          endIcon={<ArrowForwardIcon />}
          sx={{
            marginTop: 3,
            width: "80%",
            padding: "0.75rem",
            background: "linear-gradient(to right, #6a11cb, #2575fc)",
            "&:hover": {
              background: "linear-gradient(to right, #2575fc, #6a11cb)",
              transform: "scale(1.05)",
            },
            transition: "transform 0.2s, background 0.4s ease",
          }}
          onClick={handleSubmit}
        >
          Proceed
        </Button>
      </Box>
    </Box>
  );
};
export default CustomerSelection;

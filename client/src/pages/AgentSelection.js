import React, { useEffect } from "react";
import { CircularProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useTheme } from "@mui/material/styles";
import { DropDown } from "../components/Dropdown";
import Button from "@mui/material/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useHistory } from "react-router-dom";
import { getAllAgents } from "../utils/api";

export const AgentSelection = () => {
  const theme = useTheme();
  let history = useHistory();
  const [agentIds, setAgentIds] = React.useState([]);
  const [selectedId, setSelectedId] = React.useState("");

  useEffect(() => {
    async function getAgentsData() {
      const data = await getAllAgents();
      if (data.length !== 0) {
        var arr = data.map((e) => e.agentId);
        setAgentIds(arr);
      }
    }
    getAgentsData();
  }, []);

  function handleSubmit() {
    // console.log(selectedId)
    history.push(`/agent-home/${selectedId}`, { agentId: selectedId });
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
          width: 450,
          height: 450,
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          padding: "2rem",
          backdropFilter: "blur(5px)",
          border: "1px solid rgba(255, 255, 255, 0.6)",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: theme.palette.primary.main,
            marginBottom: "1.5rem",
          }}
        >
          Select Agent
        </Typography>

        {agentIds.length !== 0 ? (
          <DropDown
            label={"AgentId"}
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
export default AgentSelection;

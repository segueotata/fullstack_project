import { useState } from "react";
import "./App.css";
import { ProfileList } from "./components/ProfileList";
import { Box, Button, Typography } from "@mui/material";

function App() {
  const [showProfileList, setShowProfileList] = useState(false);

  const handleChangeUserList = () => {
    // for any components that need to be toggled
    setShowProfileList(!showProfileList);
  };
  return (
    <>
      <Box>
        <Typography
          variant="h2"
          color="primary"
          sx={{
            borderBottom: "4px solid royalblue",
          }}
        >
          Users Management Application
          <br />
          React + NestJS + PostgreSQL
        </Typography>
        <Typography variant="h2" color="primary" gutterBottom></Typography>
      </Box>

      <Box>
        <Typography
          variant="h4"
          color="primary"
          gutterBottom
          sx={{
            textAlign: "left",
          }}
        >
          System actions hotbar:
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: "1em",
            mb: "1em",
          }}
        >
          <Button variant="contained" onClick={handleChangeUserList}>
            {showProfileList ? "Hide Profiles List" : "Show Profiles List"}
          </Button>
          <Button variant="contained">Update Profiles</Button>
        </Box>
        {showProfileList ? <ProfileList /> : null}
      </Box>
    </>
  );
}

export default App;

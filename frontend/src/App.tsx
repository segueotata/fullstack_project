import { useState } from "react";
import "./App.css";
import { ProfileList } from "./components/ProfileList";
import { Button, Typography } from "@mui/material";

function App() {
  const [showProfileList, setShowProfileList] = useState(false);

  const handleChangeUserList = () => {
    // for any components that need to be toggled
    setShowProfileList(!showProfileList);
  };
  return (
    <>
      <div>
        <Typography variant="h2" color="primary">Users Management Application</Typography>
        <Typography variant="h2" color="primary" gutterBottom>React + NestJS + PostgreSQL</Typography>
      </div>

      <div>
        <Typography variant="h4" color="primary" gutterBottom>System actions hotbar:</Typography>
        <div style={{ display: "flex ", flexDirection: "column", gap: "1em" }}>
          <Button variant="contained" onClick={handleChangeUserList}>
            {showProfileList ? "Hide Profiles List" : "Show Profiles List"}
          </Button>
          
          {showProfileList ? <ProfileList /> : null}
        </div>
      </div>
    </>
  );
}

export default App;

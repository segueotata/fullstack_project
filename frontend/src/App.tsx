import { useState } from "react";
import "./App.css";
import { ProfileList } from "./components/ProfileList";

function App() {
  const [count, setCount] = useState(0);
  const [showProfileList, setShowProfileList] = useState(false);

  const handleChangeUserList = () => {
    // for any components that need to be toggled
    setShowProfileList(!showProfileList);
  };
  return (
    <>
      <div>
        <h1>Users Management Application</h1>
        <h1>React + NestJS + PostgreSQL</h1>
      </div>

      <div>
        <h2>System actions hotbar:</h2>
        <div>
          <button onClick={handleChangeUserList}>
            {showProfileList ? "Hide Profiles List" : "Show Profiles List"}
          </button>
          {showProfileList ? <ProfileList /> : null}
        </div>
      </div>
    </>
  );
}

export default App;

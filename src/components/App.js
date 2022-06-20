import RouterComponent from "./RouterComponent";
import { useEffect, useState } from "react";
import firebase from "../firebase";
import { authService } from "../firebase";
function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  return (
    <>
      {init ? <RouterComponent isLoggedIn={isLoggedIn} /> : "Initializing..."}
    </>
  );
}

export default App;

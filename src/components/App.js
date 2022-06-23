import RouterComponent from "./RouterComponent";
import { useEffect, useState } from "react";
import firebase from "../firebase";
import { authService } from "../firebase";
function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  const refreshUser = () => {
    setUserObj(authService.currentUser);
  };
  return (
    <>
      {init ? (
        <RouterComponent isLoggedIn={isLoggedIn} userObj={userObj} />
      ) : (
        "Initializing..."
      )}
    </>
  );
}

export default App;

import React from "react";
import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";

const auth = getAuth();
const user = auth.currentUser;
console.log(user);
const Navigation = ({ userObj }) => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/profile">{user.displayName} Profile</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navigation;

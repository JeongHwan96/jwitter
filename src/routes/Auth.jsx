import React, { useState } from "react";
import { authService, firsbaseInstance } from "../firebase";

const Auth = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [newAccount, setnewAccount] = useState(true);
  const [error, setError] = useState("");
  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;
      if (newAccount) {
        data = await authService.createUserWithEmailAndPassword(
          Email,
          Password
        );
      } else {
        data = await authService.signInWithEmailAndPassword(Email, Password);
      }
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };
  const toggleAccount = () => setnewAccount((prev) => !prev);
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === "google") {
      provider = new firsbaseInstance.auth.GoogleAuthProvider();
    } else if (name === "github") {
      provider = new firsbaseInstance.auth.GithubAuthProvider();
    }
    const data = await authService.signInWithPopup(provider);
    console.log(data);
  };
  return (
    <>
      <div>
        <form onSubmit={onSubmit}>
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            value={Email}
            onChange={onChange}
          />
          <input
            name="password"
            type="password"
            placeholder='"Password'
            required
            value={Password}
            onChange={onChange}
          />
          <input
            type="submit"
            value={newAccount ? "Create Account" : " Log In"}
          />
          <br></br>
          {error}
        </form>
        <span onClick={toggleAccount}>
          {" "}
          {newAccount ? "Sign In" : "Create Account"}
        </span>
      </div>
      <button onClick={onSocialClick} name="google">
        Continue With Google
      </button>
      <button onClick={onSocialClick} name="github">
        Continue With GitHub
      </button>
    </>
  );
};

export default Auth;

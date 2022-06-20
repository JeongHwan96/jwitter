import React, { useState } from "react";

const Home = () => {
  const [jweet, setJweet] = useState();
  const onSubmit = (event) => {
    event.preventDefault();
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setJweet(value);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={jweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="Jwitter" />
      </form>
    </div>
  );
};

export default Home;

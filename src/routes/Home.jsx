import React, { useEffect, useState } from "react";
import { dbService } from "../firebase";
import Jweet from "./../components/Jweet";
import { storageService } from "./../firebase";
import { v4 as uuidv4 } from "uuid";

const Home = ({ userObj }) => {
  const [jweet, setJweet] = useState();
  const [jweets, setJweets] = useState([]);
  const [attachment, setAttachment] = useState();

  useEffect(() => {
    dbService.collection("jweets").onSnapshot((snapshot) => {
      const jweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setJweets(jweetArray);
    });
  }, []);
  const onSubmit = async (event) => {
    event.preventDefault();
    const attachmentRef = storageService
      .ref()
      .child(`${userObj.uid}/${uuidv4()}`);
    const reponse = await attachmentRef.putString(attachment, "data_url");
    const attachmentUrl = await reponse.ref.getDownloadURL();
    const jweet = {
      text: jweet,
      createdAT: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    };

    await dbService.collection("jweets").add(jweet);
    setJweet("");
    setAttachment("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setJweet(value);
  };
  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };
  const onClearPhoto = () => {
    setAttachment(null);
  };

  return (
    <>
      <div>
        <form onSubmit={onSubmit}>
          <input
            value={jweet || ""}
            onChange={onChange}
            type="text"
            placeholder="What's on your mind? "
            maxLength={120}
          />
          <input type="file" accept="image/*" onChange={onFileChange} />
          <input type="submit" value="Jwitter" />
          {attachment && (
            <div>
              <img src={attachment} width="50px" height="50px" />
              <button onClick={onClearPhoto}>Clear</button>
            </div>
          )}
        </form>
      </div>
      <div>
        {jweets.map((jweet) => (
          <Jweet
            key={jweet.id}
            jweetObj={jweet}
            isOwner={jweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </>
  );
};

export default Home;

import React, { useState } from "react";
import { dbService } from "../firebase";
import { storageService } from "./../firebase";

const Jweet = ({ jweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newJweet, setNewJweet] = useState(jweetObj.text);
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc(`jweets/${jweetObj.id}`).update({
      text: newJweet,
    });
    setEditing(false);
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewJweet(value);
  };
  const onDeleteClick = async () => {
    const DeleteConfirm = window.confirm(
      "Are you sure you want to delete this jweet?"
    );

    if (DeleteConfirm) {
      await dbService.doc(`jweets/${jweetObj.id}`).delete();
      // img url 가져오기
      await storageService.refFromURL(jweetObj.attachmentUrl).delete();
    }
  };
  const toggleEdit = () => {
    setEditing((prev) => !prev);
  };
  return (
    <div>
      {editing ? (
        <>
          {isOwner && (
            <>
              {" "}
              <form onSubmit={onSubmit}>
                <input
                  onChange={onChange}
                  type="text"
                  value={newJweet}
                  required
                />
                <input type="submit" value="Update Jweet" />
              </form>
              <button onClick={toggleEdit}>Cancel</button>
            </>
          )}
        </>
      ) : (
        <>
          <h4>{jweetObj.text}</h4>
          {jweetObj.attachmentUrl && (
            <img src={jweetObj.attachmentUrl} width="50px" height="50px" />
          )}
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Jweet</button>
              <button onClick={toggleEdit}>Edit Jweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Jweet;

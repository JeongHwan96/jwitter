import React, { useEffect, useState } from "react";
import { dbService } from "../firebase";
import Jweet from "./../components/Jweet";
import { storageService } from "./../firebase";
import { v4 as uuidv4 } from "uuid";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

const Home = ({ userObj }) => {
  const [jweet, setJweet] = useState();
  const [jweets, setJweets] = useState([]);
  const [attachment, setAttachment] = useState("");

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
    let attachmentUrl = "";
    console.log(userObj);
    //이미지 첨부하지 않고 텍스트만 올리고 싶을 때도 있기 때문에 attachment가 있을때만 아래 코드 실행
    //이미지 첨부하지 않은 경우엔 attachmentUrl=""이 된다.
    if (attachment !== "") {
      //파일 경로 참조 만들기
      const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
      //storage 참조 경로로 파일 업로드 하기
      const response = await uploadString(
        attachmentRef,
        attachment,
        "data_url"
      );
      //storage 참조 경로에 있는 파일의 URL을 다운로드해서 attachmentUrl 변수에 넣어서 업데이트
      attachmentUrl = await getDownloadURL(response.ref);
    }

    //트윗 오브젝트
    const jweetObj = {
      text: jweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    };

    //트윗하기 누르면 jweetObj 형태로 새로운 document 생성하여 jweets 콜렉션에 넣기
    await addDoc(collection(dbService, "jweets"), jweetObj);

    //state 비워서 form 비우기
    setJweet("");
    console.log(jweet);

    //파일 미리보기 img src 비워주기
    setAttachment("");
  };

  //첨부 파일 url 넣는 state인 attachment 비워서 프리뷰 img src 없애기
  const onClearAttachment = () => {
    //null에서 빈 값("")으로 수정, 트윗할 때 텍스트만 입력시 이미지 url ""로 비워두기 위함
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
          <input
            className="fileupload"
            type="file"
            accept="image/*"
            onChange={onFileChange}
          />
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

// const onSubmit = async (event) => {
//   event.preventDefault();
//   const attachmentRef = storageService
//     .ref()
//     .child(`${userObj.uid}/${uuidv4()}`);
//   const reponse = await attachmentRef.putString(attachment, "data_url");
//   const attachmentUrl = await reponse.ref.getDownloadURL();
//   const jweet = {
//     text: jweet,
//     createdAT: Date.now(),
//     creatorId: userObj.uid,
//     attachmentUrl,
//   };

//   await dbService.collection("jweets").add(jweet);
//   setJweet("");
//   setAttachment("");
// };

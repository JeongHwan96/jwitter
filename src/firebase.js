import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCExmOwOQ_yXr6f1vV2sEkBOvGes4w1o8Y",
  authDomain: "jwitter-3086a.firebaseapp.com",
  projectId: "jwitter-3086a",
  storageBucket: "jwitter-3086a.appspot.com",
  messagingSenderId: "937367942988",
  appId: "1:937367942988:web:7ffc1e7e41904e7e9241e9",
  measurementId: "G-056XYQXXHR",
};
export default firebase.initializeApp(firebaseConfig);
export const firsbaseInstance = firebase;
export const authService = firebase.auth();
export const dbService = firebase.firestore();
export const storageService = firebase.storage();

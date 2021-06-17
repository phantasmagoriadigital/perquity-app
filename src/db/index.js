import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBGZrcLHJD4l9s48r6RMjwgOrO6jyGADlQ",
  authDomain: "perquity-newschema.firebaseapp.com",
  projectId: "perquity-newschema",
  storageBucket: "perquity-newschema.appspot.com",
  messagingSenderId: "346716444076",
  appId: "1:346716444076:web:4f45ab151243fbb4abd609",
  measurementId: "G-JMJFEFSTQ7"
};

// Get a Firestore instance
export const db = firebase.initializeApp(firebaseConfig).firestore();
export const auth = firebase.auth();

// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples
// const { TimeStamp, GeoPoint } = firebase.firestore;
// export { TimeStamp, GeoPoint };
export const Timestamp = firebase.firestore.Timestamp;
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp();
export const arrayAdd = firebase.firestore.FieldValue;

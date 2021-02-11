import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyAga6C_m8df-eskcA8bLj9Mhylg1e7sOMk",
  authDomain: "small-fish-app.firebaseapp.com",
  projectId: "small-fish-app",
  storageBucket: "small-fish-app.appspot.com",
  messagingSenderId: "244647150313",
  appId: "1:244647150313:web:fb5e9b777b66cdcfe56678",
  measurementId: "G-WD9EHK0Z0P"
};

// Get a Firestore instance
export const db = firebase.initializeApp(firebaseConfig).firestore();
export const auth = firebase.auth();

// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples
const { TimeStamp, GeoPoint } = firebase.firestore;
export { TimeStamp, GeoPoint };

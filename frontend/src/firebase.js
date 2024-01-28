import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAUeNBbx0JIiQeLj2PoiGijByxf6goz8EE",
  authDomain: "challenge-809dc.firebaseapp.com",
  projectId: "challenge-809dc",
  storageBucket: "challenge-809dc.appspot.com",
  messagingSenderId: "937166701581",
  appId: "1:937166701581:web:7a959acc2473a008234144",
  measurementId: "G-RBNP4WZ59M",
};

// Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth, db };

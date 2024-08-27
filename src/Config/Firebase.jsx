
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAxUgjhNZWuapksmPNVbHW2GM2kizcg4fE",
    authDomain: "react-786.firebaseapp.com",
    projectId: "react-786",
    storageBucket: "react-786.appspot.com",
    messagingSenderId: "264344045720",
    appId: "1:264344045720:web:72a4ec40246a36687568ed"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getFirestore(app)

export {auth,database}

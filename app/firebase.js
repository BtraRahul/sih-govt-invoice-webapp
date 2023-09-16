// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDG26AxPXrAj3HP9XBTOH-1T1vWzPCa3Xg",
  authDomain: "bill-fa768.firebaseapp.com",
  projectId: "bill-fa768",
  storageBucket: "bill-fa768.appspot.com",
  messagingSenderId: "215887750082",
  appId: "1:215887750082:web:957a3690f8a18ced532c5b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

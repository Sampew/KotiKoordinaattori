// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore, collection, addDoc, serverTimestamp, querySnapshot} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAb43SGmyS_Pcr2mOdYO29E6YG4vQYCtyw",
  authDomain: "saunavuoro-app.firebaseapp.com",
  projectId: "saunavuoro-app",
  storageBucket: "saunavuoro-app.appspot.com",
  messagingSenderId: "581701194428",
  appId: "1:581701194428:web:afcaf88ae8f2d2122f36b9"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const firestore = getFirestore();

const MESSAGES = 'messages';

export {
    firestore,
    collection,
    addDoc,
    serverTimestamp,
    MESSAGES
};
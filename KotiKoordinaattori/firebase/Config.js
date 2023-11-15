import { initializeApp } from "firebase/app";
import { getFirestore,collection, addDoc, getDoc,query, onSnapshot, orderBy, deleteDoc, doc, getDocs, setDoc, updateDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAb43SGmyS_Pcr2mOdYO29E6YG4vQYCtyw",
    authDomain: "saunavuoro-app.firebaseapp.com",
    projectId: "saunavuoro-app",
    storageBucket: "saunavuoro-app.appspot.com",
    messagingSenderId: "581701194428",
    appId: "1:581701194428:web:afcaf88ae8f2d2122f36b9"
  };

const app = initializeApp(firebaseConfig)
const firestore = getFirestore(app);

export {
  firestore, 
  collection, 
  addDoc, 
  getDoc,
  query, 
  onSnapshot, 
  orderBy, 
  deleteDoc, 
  doc,
  getDocs,
  setDoc,
    updateDoc
};

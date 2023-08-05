// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore, collection, addDoc, orderBy, query, onSnapshot } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAxfQSuhJOtyrXLPHBvU8ht1nHRiO49wRA",
  authDomain: "appointment-scheduler-ap-d67bd.firebaseapp.com",
  projectId: "appointment-scheduler-ap-d67bd",
  storageBucket: "appointment-scheduler-ap-d67bd.appspot.com",
  messagingSenderId: "322189594409",
  appId: "1:322189594409:web:1951218b8115f170a9b138",
  measurementId: "G-8GXG9V8CNX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app); //db
export const createNewUser = createUserWithEmailAndPassword;
export const loginUser = signInWithEmailAndPassword;
export const logoutUser = signOut;
export const createAppointment = addDoc;
export const storage=getStorage()
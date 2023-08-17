// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBL5HBEPa_SC1Dlixrw5YSSBfYtwsNixHg",
  authDomain: "dnd-demo-e45c1.firebaseapp.com",
  databaseURL: "https://dnd-demo-e45c1-default-rtdb.firebaseio.com",
  projectId: "dnd-demo-e45c1",
  storageBucket: "dnd-demo-e45c1.appspot.com",
  messagingSenderId: "121871190080",
  appId: "1:121871190080:web:7a8c44455c6c7527ac37a5",
  measurementId: "G-Z9C2D5GZ0G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app)

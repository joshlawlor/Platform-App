import React from "react";
import Navbar from "../Navbar/Navbar";
import { getUser } from "../../service/AuthService";

//FIREBASE IMPORTS
import {initializeApp} from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import {useAuthState} from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';

initializeApp({
  apiKey: "AIzaSyBL5HBEPa_SC1Dlixrw5YSSBfYtwsNixHg",
  authDomain: "dnd-demo-e45c1.firebaseapp.com",
  databaseURL: "https://dnd-demo-e45c1-default-rtdb.firebaseio.com",
  projectId: "dnd-demo-e45c1",
  storageBucket: "dnd-demo-e45c1.appspot.com",
  messagingSenderId: "121871190080",
  appId: "1:121871190080:web:7a8c44455c6c7527ac37a5",
  measurementId: "G-Z9C2D5GZ0G"
})

 
function ChatPage() {
  if (getUser() == undefined) {
    console.log(getUser());
    console.log("NO USER");
    window.location.replace("/");
  }

  return (
    <div className="chat-page-container">
      <Navbar></Navbar>
      <div className="chat-page-header">CHAT HERE

        <div className="chat-container">



        </div>

      </div>
    </div>
  );
}

export default ChatPage;

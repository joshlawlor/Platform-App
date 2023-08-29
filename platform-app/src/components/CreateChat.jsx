import React, { useState } from "react";
import { auth, db } from "../firebase";
import {
  addDoc,
  collection,
  serverTimestamp,
  doc,
  setDoc,
  createId,
} from "firebase/firestore";

const CreateChat = () => {
  const [input, setInput] = useState("");

  const createChat = async (e) => {
    e.preventDefault();
    if (input === "") {
      alert("Please enter a valid chat name");
      return;
    }
    const { uid, displayName } = auth.currentUser;

    //THIS IS THE ROUTE TO THE CHAT COLLECTION
    const chatCollectionRef = collection(db, "chats");

    const chatDocRef = doc(chatCollectionRef);

    await setDoc(chatDocRef, {
      name: input,
      owner: displayName,
      uid,
      timestamp: serverTimestamp(),
    });

    //THIS IS THE ROUTE TO CREATE A MESSAGES SUBCOLLECTION INSIDE THE CHAT DOCMENT

    const messagesSubcollectionRef = collection(chatDocRef, "Messages");

    await addDoc(messagesSubcollectionRef, {
      text: "Chat Created",
      timestamp: serverTimestamp(),
    });
    setInput("");
  };

  return (
    <form onSubmit={createChat}>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        type="text"
        placeholder="Chat Name"
      />

      <button>Create a New Chat</button>
    </form>
  );
};

export default CreateChat;

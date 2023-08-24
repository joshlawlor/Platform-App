import React, { useState } from "react";
import { auth, db } from "../firebase";
import { addDoc, collection, serverTimestamp, doc, setDoc } from "firebase/firestore";

const CreateChat = () => {
  const [input, setInput] = useState("");

  const createChat = async (e) => {
    e.preventDefault();
    if(input === ''){
        alert("Please enter a valid chat name");
        return;
    }
    const {uid, displayName} = auth.currentUser
    const chatCollectionRef = collection(db, 'chats')

    const chatDocRef = doc(chatCollectionRef, input);

    await setDoc(chatDocRef, {
        name: input,
        owner: displayName,
        uid,
        timestamp: serverTimestamp()
    });
    
    const messagesSubcollectionRef = collection(db, 'chatmessages');

    await addDoc(messagesSubcollectionRef, {
        name: 'first chat',
        
    })
        // await addDoc(collection(db, 'chats'), {
        //     text: input,
        //     owner: displayName,
        //     uid,
        //     timestamp: serverTimestamp()
        // })
    setInput('')
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

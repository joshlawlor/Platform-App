import React, { useState } from "react";
import {auth,db} from '../firebase'
import { addDoc,doc, collection, serverTimestamp } from "firebase/firestore";


const SendMessage = ({scroll, roomID}) => {
  const [input, setInput] = useState("");

   //THIS GRABS THE SPECIFIC ROOM DOC FROM THE CHATS COLLECTION
   const chatRoomRef= doc(collection(db, 'chats'), roomID);
   //THIS GRABS THE SPECIFIC MESSAGES SUBCOLLECTION FROM THE ROOM DOC
   const messagesSubcollectionRef = collection(chatRoomRef, 'Messages');

    const sendMessage = async (e) => {


        e.preventDefault();
        if(input === ''){
            alert("Please enter a valid message");
            return;
        }
        const {uid, displayName} = auth.currentUser
        await addDoc(messagesSubcollectionRef, {
            text: input,
            name: displayName,
            uid,
            timestamp: serverTimestamp()
        })
        setInput('')
        scroll.current.scrollIntoView({behavior: 'smooth'})
    }

  return (
    
      <form onSubmit={sendMessage} className="sendMessage">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          placeholder="Message"
        />
        <button type="submit">Send</button>
      </form>
    
  );
};

export default SendMessage;

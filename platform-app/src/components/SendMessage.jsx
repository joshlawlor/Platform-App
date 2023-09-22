import React, { useState } from "react";
import {auth,db} from '../firebase'
import { addDoc,doc, collection, serverTimestamp } from "firebase/firestore";


const SendMessage = ({scroll, roomID}) => {
  const [input, setInput] = useState("");
  const CHARACTER_LIMIT = 20000;
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

        const inputText = input.slice(0, CHARACTER_LIMIT);
        let truncatedInput = "";

        for (let i = 0; i < inputText.length; i += 74) {
          truncatedInput += inputText.slice(i, i + 74) + " ";
        }

        await addDoc(messagesSubcollectionRef, {
            text: truncatedInput,
            name: displayName,
            uid,
            timestamp: serverTimestamp()
        })
        setInput('')
        scroll.current.scrollIntoView({behavior: 'smooth'})
    }

    const handleInputChange = (e) => {
      const value = e.target.value;
      if (value.length <= CHARACTER_LIMIT) {
        setInput(value);
      }
    };  

  return (
    
      <form onSubmit={sendMessage} className="sendMessage">
        <input
          value={input}
          onChange={handleInputChange}
          type="text"
          placeholder="Message"
        />
        <button type="submit">Send</button>
      </form>
    
  );
};

export default SendMessage;

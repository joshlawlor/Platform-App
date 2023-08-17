import React, { useState } from "react";
import {auth,db} from '../firebase'
import { addDoc, collection,serverTimestamp } from "firebase/firestore";
const SendMessage = () => {
  const [input, setInput] = useState("");

    const sendMessage = async (e) => {
        e.preventDefault();
        const {uid, displayName} = auth.currentUser
        await addDoc(collection(db, 'messages'), {
            text: input,
            name: displayName,
            uid,
            timestamp: serverTimestamp()
        })
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

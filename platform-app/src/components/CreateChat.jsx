import React, { useState } from "react";
import { auth, db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const CreateChat = () => {
  const [input, setInput] = useState("");

  const createChat = async (e) => {
    e.preventDefault();
  
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

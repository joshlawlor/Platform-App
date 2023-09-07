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


//ALGOLA EXTENSIONS 
//THIS EXTENSION INDEXES THE USERS COLLECTION IN FIRESTORE
const algoliaAppId = process.env.REACT_APP_ALGOLIA_APP_ID
const algoliaApiKey = process.env.REACT_APP_ALGOLIA_API_KEY
const algoliasearch = require('algoliasearch');
const client = algoliasearch(algoliaAppId, algoliaApiKey);
const index = client.initIndex('dev_users');

const CreateChat = () => {
  const { uid, displayName } = auth.currentUser;
  const [input, setInput] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [userList, setUserList] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(null);
 
const handleSearchInputChange = (e) => {
  const value = e.target.value;
  setSearchInput(value);
  if(searchTimeout) {
    clearTimeout(searchTimeout);
  }

  setSearchTimeout(
    setTimeout(() => {
      searchUsers(value)
    }, 500)
  );
}

const searchUsers = (value) => {
 //THIS FUNCTION SEARCHES THE ALGOLIA INDEX OF USERS COLLECTION AND RETURNS WHAT MATCHES
 index.search(value)
 .then(({hits}) => {
   console.log('USER SEARCH',hits);
   setSearchResults(hits);
 })
 .catch(err => {
   console.log(err);
 })
 
}

  const handleUserChange = (index, value) => {
    const updatedUserList = [...userList]
    if (!updatedUserList.includes(value)) {
      // If it doesn't exist, add it to the end of the array
      updatedUserList.push(value);
    }
     
    setUserList([...updatedUserList]);
    console.log(userList);
  };

  const createChat = async (e) => {
    e.preventDefault();
    if (input === "") {
      alert("Please enter a valid chat name");
      return;
    }

    //THIS IS THE ROUTE TO THE CHAT COLLECTION
    const chatCollectionRef = collection(db, "chats");

    const chatDocRef = doc(chatCollectionRef);

    if(!userList.includes(displayName)) {
      console.log(displayName + ' changed')
      userList.push(displayName);
    }
    
    // const finalUsers = [displayName, ...userList]
    await setDoc(chatDocRef, {
      name: input,
      owner: displayName,
      userList: userList,
      uid,
      timestamp: serverTimestamp(),
    });

    const messagesSubcollectionRef = collection(chatDocRef, "Messages");

    await addDoc(messagesSubcollectionRef, {
      text: "Chat Created",
      timestamp: serverTimestamp(),
    });

    setInput("");
    setUserList([""]);
    setSearchInput("")
    setSearchResults([])
  };

  return (
    <form onSubmit={createChat}>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        type="text"
        placeholder="Chat Name"
      />
      <input
        value={searchInput}
        onChange={(e) => handleSearchInputChange(e)}
        type="text"
        placeholder="Search for user (username)"
      />
      <div>
      {searchResults.map((result, index) => (
        <button
        type="button"
          key={result.objectID}
          onClick={() => handleUserChange(index, result.username)}
        >
          {result.username}
        </button>
      ))}
      </div>
      <div>
        <strong>Current User List:</strong>
        {userList.map((user, index) => (
          // Corrected this line to return JSX
          <p key={index}>{user}</p>
        ))}
      </div>

      <br />
      <br />
      <button type="submit">Create a New Chat</button>
    </form>
  );
};

export default CreateChat;

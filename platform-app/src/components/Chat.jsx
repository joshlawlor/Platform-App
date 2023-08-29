import React , {useState, useEffect, useRef} from "react";
import Message from "./Message";
import {db} from '../firebase';
import {query, doc, collection, orderBy, onSnapshot}from 'firebase/firestore'
import SendMessage from "./SendMessage";

const Chat = ({roomID, roomName}) => {
    const [messages, setMessages] = useState([]);
    const scroll = useRef()

    useEffect(() => {
        //THIS GRABS THE SPECIFIC ROOM DOC FROM THE CHATS COLLECTION
        const chatRoomRef= doc(collection(db, 'chats'), roomID);
        //THIS GRABS THE SPECIFIC MESSAGES SUBCOLLECTION FROM THE ROOM DOC
        const messagesSubcollectionRef = collection(chatRoomRef, 'Messages');


        const q = query(messagesSubcollectionRef, orderBy('timestamp'));
        console.log(q)
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let messages = [];  
            querySnapshot.forEach((doc) => {
                messages.push({...doc.data(), id: doc.id});
            })
            setMessages(messages)
        })
        return () => unsubscribe();
    }, [roomName])

    return (
    <>
      <div className="chat-component-main">
        {messages && messages.map((message) => (
            <Message key={message.id} message={message}/>
        ))}
        
        </div>
        <SendMessage scroll={scroll} roomID={roomID}/>
        {/* Send Message Component */}
        <span ref={scroll}>

        </span>
    </>
  );
};

export default Chat;

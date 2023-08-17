import React , {useState, useEffect, useRef} from "react";
import Message from "./Message";
import {db} from '../firebase';
import {query,  collection, orderBy, onSnapshot}from 'firebase/firestore'
import SendMessage from "./SendMessage";

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const scroll = useRef()

    useEffect(() => {
        const q = query(collection(db, 'messages'), orderBy('timestamp'));
        console.log(q)
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let messages = [];  
            querySnapshot.forEach((doc) => {
                messages.push({...doc.data(), id: doc.id});
            })
            setMessages(messages)
        })
        return () => unsubscribe();
    }, [])

    return (
    <>
      <div className="chat-component-main">
        {messages && messages.map((message) => (
            <Message key={message.id} message={message}/>
        ))}
        
        </div>
        <SendMessage scroll={scroll}/>
        {/* Send Message Component */}
        <span ref={scroll}>

        </span>
    </>
  );
};

export default Chat;

import React , {useState, useEffect, useRef} from "react";
import Message from "./Message";
import {db} from '../firebase';
import {query, QuerySnapshot, collection, orderBy, onSnapshot}from 'firebase/firestore'


const Chat = () => {
    const [messages, setMessages] = useState([]);
    const scroll = useRef()

    useEffect(() => {
        const q = query(collection(db, 'messages'), orderBy('timestamp'));
        console.log(q)
        const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
            let messages = [];  
            QuerySnapshot.forEach((doc) => {
                messages.push({...doc.data(), id: doc.id});
            })
            setMessages(messages)
        })
        return () => unsubscribe();
    }, [])

    return (
    <>
      <div className="chat-component-main">
        {messages && messages.map((message) => {
            <Message key={message.id} message={message}/>
        })}
        
        </div>
        {/* Send Message Component */}
        <span ref={scroll}>

        </span>
    </>
  );
};

export default Chat;

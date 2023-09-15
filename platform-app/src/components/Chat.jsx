import React , {useState, useEffect, useRef} from "react";
import Message from "./Message";
import {auth , db} from '../firebase';
import {query, doc, collection, orderBy, deleteDoc, updateDoc, onSnapshot}from 'firebase/firestore'
import { useAuthState } from "react-firebase-hooks/auth";
import SendMessage from "./SendMessage";

const Chat = ({roomID, roomName, roomOwner, userList}) => {
    const [chatUser] = useAuthState(auth);
    const [isOwner, setIsOwner] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [editingRoomName, setEditingRoomName] = useState(false);
    const [newRoomName, setNewRoomName] = useState("");
    const [roomTitle, setRoomTitle] = useState("");
    const [messages, setMessages] = useState([]);
    const scroll = useRef()    
    useEffect(() => {
        console.log(roomOwner)
        //THIS CHECKS IF CHAT USER IS THE OWNER (GIVES THEM EDITING POWER)
        if (roomOwner === chatUser.displayName) {
            setIsOwner(chatUser.displayName);
          }
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
    }, [roomName, roomOwner, chatUser])


    const chatRoomRef = doc(collection(db, "chats"), roomID);
    const deleteChatRoom = async () => {
      try {
        await deleteDoc(chatRoomRef);
        window.location.replace("/chat");
      } catch (error) {
        console.error("Error deleting chat: ", error);
      }
    };

    const handleRoomNameChange = (e) => {
        setNewRoomName(e.target.value); 
      };

      

      const handleUserListChange = async (updatedList) => {
        try {
            await updateDoc(chatRoomRef, {
              userList: updatedList ,
            });
            setShowForm(false);
            setRoomTitle(newRoomName);
            setEditingRoomName(false);
            // window.location.replace("/chat");
          } catch (error) {
            console.error("Error editing chat: ", error);
          }
      };

      const removeUserFromList = (userToRemove) => {
        const updatedList = userList.filter((user) => user !== userToRemove);
        handleUserListChange(updatedList);
      };
    
    const editRoomName = async () => {
      try {
        await updateDoc(chatRoomRef, {
          name: newRoomName ,
        });
        setShowForm(false);
        setRoomTitle(newRoomName);
        setEditingRoomName(false);
        // window.location.replace("/chat");
      } catch (error) {
        console.error("Error editing chat: ", error);
      }
    };
  
    const openEditForm = () => {
        setShowForm(!showForm);
    };

    return (
    <>
      <div className="chat-component-main">
        <div className="chat-edit-container">
        <h1>CHAT ROOM:{editingRoomName ? newRoomName : roomTitle || roomName}</h1>
        {isOwner ? (
          <button onClick={deleteChatRoom} type="button">
                      DELETE CHAT
        </button>
        ) : null}
        <br/>
        <br/>
        {isOwner ? (
          <button onClick={openEditForm} type="button">
            EDIT CHAT
          </button>
        ) : null}
        
        {showForm && (
          <div>
            <form>
              <label>New Room Name:</label>
              <input type="text" 
              value={newRoomName} 
              onChange={handleRoomNameChange}
              />
              <button type="button" onClick={editRoomName}>Edit Chat Name</button>
              <br />

              <label>User List:</label>
                    <div className="userList-container">
                  {userList.map((user, index) => (
                     user !== roomOwner ? (
                        <div key={index}>
                          {user}
                          <button type="button" onClick={() => removeUserFromList(user)}>X</button>
                        </div>
                      ) : null
                    

                  ))}
                </div>
            </form>
          </div>
        )}

        </div>

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

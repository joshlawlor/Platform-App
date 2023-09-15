import React, { useState, useRef, useEffect } from "react";
import CreateChat from "./CreateChat";
import { db , auth} from "../firebase";
import { query, collection, orderBy, onSnapshot, where } from "firebase/firestore";
import Room from "./Rooms";

export const ChatRooms = () => {
  const { uid, displayName } = auth.currentUser;
  const [rooms, setRooms] = useState([]);
  useEffect(() => {

    if(displayName){
      const q = query(collection(db, "chats"), where("userList", "array-contains", displayName));
      console.log(q);
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let chats = [];
        querySnapshot.forEach((doc) => {
          chats.push({ ...doc.data(), id: doc.id });
        });
        setRooms(chats);
      });
      return () => unsubscribe();


    }
   

  }, [uid,displayName]);

  return (
    <div>
      <CreateChat />
      <br />
      <div>
        {rooms && rooms.map((room) => <Room key={room.id} room={room} owner={room.owner} />)}
      </div>
    </div>
  );
};

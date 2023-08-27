import React, { useState, useRef, useEffect } from "react";
import CreateChat from "./CreateChat";
import { db } from "../firebase";
import { query, collection, orderBy, onSnapshot } from "firebase/firestore";
import Room from "./Rooms";

export const ChatRooms = () => {
  const [rooms, setRooms] = useState([]);
  const scroll = useRef();

  useEffect(() => {
    const q = query(collection(db, "chats"), orderBy("timestamp"));
    console.log(q);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let chats = [];
      querySnapshot.forEach((doc) => {
        chats.push({ ...doc.data(), id: doc.id });
      });
      setRooms(chats);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <CreateChat />
      <div>
        {rooms && rooms.map((room) => <Room key={room.id} room={room} />)}
      </div>
    </div>
  );
};

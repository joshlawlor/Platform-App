import React from 'react'
import './Rooms.css'
const Room = ({room}) => {
  return (
    <div>
        <div className='room'>
            <p className='name'>{room.name}</p>
            <p>Owner: {room.owner}</p>
        </div>

    </div>
  )
}

export default Room
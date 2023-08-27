import React from 'react'

const Room = ({room}) => {
  return (
    <div>
        <div className='message'>
            <p className='name'>{room.name}</p>
            <p>{room.owner}</p>
        </div>

    </div>
  )
}

export default Room
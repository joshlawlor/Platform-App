import React from 'react';
import { useNavigate } from 'react-router-dom';

function AppHome(){
  const navigate = useNavigate();
    return(
        <div className="App">
        <header className="App-header">
        <h1 className='homeTitle'>Dungeons & Dummies</h1>
        <br/>
        </header>
        <div>
   
        </div>
      </div>
    )
}

export default AppHome;
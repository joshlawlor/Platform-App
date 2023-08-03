import React from 'react';
import { useNavigate } from 'react-router-dom';
import {getUser, resetUserSession} from '../../service/AuthService';
function AppHome(){
  const user = getUser();
  console.log(user);
  const name = user.username !== 'undefined' && user ? user.username : '';
  const navigate = useNavigate();
    return(
        <div className="App">
        <header className="App-header">
        <h1 className='homeTitle'>Welcome {name}</h1>
        <br/>
        </header>
        <div>
   
        </div>
      </div>
    )
}

export default AppHome;
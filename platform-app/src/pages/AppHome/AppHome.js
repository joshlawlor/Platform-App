import React from 'react';
import { useNavigate } from 'react-router-dom';
import {getUser, resetUserSession} from '../../service/AuthService';
function AppHome(){
  const user = getUser();
  console.log(user);
  const name = user.username !== 'undefined' && user ? user.username : '';
  const navigate = useNavigate();

  const logoutHandler = () => {
    resetUserSession();
    navigate('/login')
  }
    return(
        <div className="App">
        <header className="App-header">
        <h1 className='homeTitle'>Welcome {name}</h1>
        <br/>
        <button onClick={logoutHandler}>LOGOUT</button>
        </header>
        <div>
   
        </div>
      </div>
    )
}

export default AppHome;
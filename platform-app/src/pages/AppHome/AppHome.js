import React from 'react';
import './AppHome.css'
import dagger from '../../components/images/dagger.png'
import { useNavigate } from 'react-router-dom';

function AppHome(){
  const navigate = useNavigate();
    return(
        <div className="App">
        <header className="App-header">
        <h1 className='homeTitle'>Dungeons & Dummies</h1>
        <br/>
        </header>
        <img src={dagger} className="App-logo" alt="logo" />
        <div>
          <button onClick={() => navigate('/login')}>Login</button>
          <button onClick={() => navigate('/register')}>Sign Up</button>
        </div>
      </div>
    )
}

export default AppHome;
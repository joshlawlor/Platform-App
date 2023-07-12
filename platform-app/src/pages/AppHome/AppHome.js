import React from 'react';
import './AppHome.css'
import dagger from '../../components/images/dagger.png'


function AppHome(){

    return(
        <div className="App">
        <header className="App-header">
        <h1 className='homeTitle'>Dungeons & Dummies</h1>
        <br/>
        </header>
        <img src={dagger} className="App-logo" alt="logo" />
        <div>
          <button>Login</button>
          <button>Sign Up</button>
        </div>
      </div>
    )
}

export default AppHome;
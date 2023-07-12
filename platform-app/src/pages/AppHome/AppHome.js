import React from 'react';

import dagger from '../../components/images/dagger.png'


function AppHome(){

    return(
        <div className="App">
        <header className="App-header">
        <h1>Dungeons & Dummies</h1>
        <br/>
          <img src={dagger} className="App-logo" alt="logo" />
        </header>
      </div>
    )
}

export default AppHome;
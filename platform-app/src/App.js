import React, { useState, useEffect } from "react";
import axios from "axios";
//AUTH IMPORTS
// import PublicRoute from "./routes/PublicRoute";
// import PrivateRoute from "./routes/PrivateRoute";
import {getUser, getToken, setUserSession, resetUserSession} from "./service/AuthService";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import "./App.css";

//PAGES IMPORTS
import AppLanding from "./pages/AppLanding/AppLanding";
import AppHome from "./pages/AppHome/AppHome";
import AppLogin from "./pages/AppLogin/AppLogin";
import AppRegister from "./pages/AppRegister/AppRegister";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import ChatPage from "./pages/ChatPage/ChatPage";

//CONTEXT IMPORTS
import SignUpProvider from "./context/SignUpProvider";
export const AppContext = React.createContext({});

 
const verifyTokenAPIURL = "https://iyufswqyje.execute-api.us-east-1.amazonaws.com/Development/verified"
const apiKey = process.env.REACT_APP_API_KEY  

function App() {

  const [isAuthenticating, setAuthenticating] = useState(true)

  useEffect(() => {
    const token = getToken();
    if(token === 'undefined' || token === undefined || token === null || !token){
      return;
    }

    const requestConfig = {
      headers: { 'Content-Type': 'application/json',
    'x-api-key': apiKey },
    }

    const requestBody = {
      user: getUser(),
      token: token
    }

    axios.post(verifyTokenAPIURL,requestBody,requestConfig).then(response => {
      setUserSession(response.data.user, response.data.token)
      setAuthenticating(false)
      console.log('Verified')
    }).catch(() => {
      console.log('Error Validating')
      resetUserSession();
      setAuthenticating(false)
    })


  }, [])

  const token = getToken();
  if(isAuthenticating && token){
    return <div>Authenticating...</div>
  }

  const AppContextValue = {};

  return (
    <AppContext.Provider value={AppContextValue}>

    <BrowserRouter>
      <SignUpProvider>
        <Routes>
          <Route path="/" element={<AppLanding />} />
          <Route path="/home" element={<AppHome />} />
          <Route path="/login" element={<AppLogin />} />
          <Route path="/register" element={<AppRegister />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/chat" element={<ChatPage />} />
        </Routes>
      </SignUpProvider>
    </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;

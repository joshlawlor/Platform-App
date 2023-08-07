import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import "./App.css";

//PAGES IMPORTS
import AppLanding from "./pages/AppLanding/AppLanding";
import AppHome from "./pages/AppHome/AppHome";
import AppLogin from "./pages/AppLogin/AppLogin";
import AppRegister from "./pages/AppRegister/AppRegister";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
//CONTEXT IMPORTS
import SignUpProvider from "./context/SignUpProvider";
export const AppContext = React.createContext({});

function App() {
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
        </Routes>
      </SignUpProvider>
    </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;

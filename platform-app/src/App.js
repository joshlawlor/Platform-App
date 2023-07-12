import {Route, Routes, BrowserRouter} from 'react-router-dom'


import './App.css';

//PAGES IMPORTS
import AppHome from './pages/AppHome/AppHome';
import AppLogin from './pages/AppLogin/AppLogin';
import AppRegister from './pages/AppRegister/AppRegister';
function App() {
  return (
    <BrowserRouter>
 
    
    <Routes>
      <Route path="/" element={<AppHome/>}/>
      <Route path="/login" element={<AppLogin/>}/>
      <Route path="/register" element={<AppRegister/>}/>
    </Routes>
    </BrowserRouter>
    
  );
}

export default App;

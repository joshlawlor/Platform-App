import {Route, Routes, BrowserRouter} from 'react-router-dom'


import './App.css';

//PAGES IMPORTS
import AppHome from './pages/AppHome/AppHome';

function App() {
  return (
    <BrowserRouter>
 
    
    <Routes>
      <Route path="/" element={<AppHome/>}/>
    </Routes>
    </BrowserRouter>
    
  );
}

export default App;

import logo from './logo.svg';
import './App.css';
import Connexion from './Connexion';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Accueil from './Accueil';
import Api from './Api'
import Inscription from './Inscription';
import Contact from './Contact';
import Apropos from './Apropos';
import React, {useState, useEffect} from 'react';
import {Radio} from "react-loader-spinner";
import Editionprofil from './Editionprofil';
import Profil from './Profil';
import Sedeconnecter from './Sedeconnecter';


function App() {

  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2020);
  }, [])

  
  
  return (
  <>

  
    {
    isLoading?
    <div className='loader'>
      <h1>Flight Tracker</h1>
    <Radio
    type="Hearts"
    colors={['#FFFFFF','#FFFFFF', '#FFFFFF']}
    height={100}
    width={100}
    timeout={3000} //3 secs
    />
     </div>
    :
 
  
    <Router>
    <div className='container'>

      
    
      <Routes>
        <Route path="/Web" element={<Accueil/>}/>
        <Route path="/connexion" element={<Connexion/>}/>
        <Route path="/inscription" element={<Inscription/>}/>
        <Route path="/editionprofil" element={<Editionprofil/>}/>
        <Route path="/profil" element={<Profil/>}/>
        <Route path="/sedeconnecter" element={<Sedeconnecter/>}/>
        <Route path="/api" element={<Api/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/apropos" element={<Apropos/>}/>
      </Routes>
    </div>
    </Router>
    
    }
   
    
    </>

  );
}

export default App;

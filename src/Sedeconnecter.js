import React, { useState, useEffect, useRef } from 'react';
import {BrowserRouter as Router, Routes, Route, Link, json, useNavigate } from 'react-router-dom';
import airplane from './image/airplane.png'
import './Profil.css'
import {FaBars , FaTimes} from "react-icons/fa"
import {ChakraProvider, Box, Text, Avatar, AvatarBadge, Stack } from '@chakra-ui/react'

const Sedeconnecter=()=>{

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
      if (window.myGlobalLogin === true) {
        setIsLoggedIn(true);
      }
    }, []);
  

    const navRef =useRef();

    const showNavbar =  ()=>{
        navRef.current.classList.toggle("responsive_nav"); 
    }

    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            window.myGlobalLogin = false
         navigate('/connexion');
        }, 1800);
    
        return () => clearInterval(interval);
      }, [navigate]);

      const [newsletterData, setnewsletterData] = useState({
        newsletter:'',
       });
 
       const handleChangeNewsletter= (event) => {
         const { name, value } = event.target;
         setnewsletterData((newsletterData) => ({ ...newsletterData, [name]: value }));
       };
 
       const [responseNews, setResponseNews] = useState(null);
       
 
     const newsletterSend = (event) => {
         event.preventDefault();
       
         fetch("http://localhost/php/newsletter.php", {
           method: 'POST',
           body: JSON.stringify({
             data: newsletterData,
           }),
           headers: {
             'Content-Type': 'application/json',
           },
         })
           .then((response) => response.text())
           .then((data) => {
             setResponseNews(data);
            
               }
             
           )
           .catch((error) => {
             console.error(error);
           });
       };
     


    return( 
    <>

<ChakraProvider>
          <header>
              <a href="" className="logo"><img src={airplane} alt=""/>Flight Tracker</a>

              <nav ref={navRef }>
                  {/* Show different links based on the user's login status */}
                  {isLoggedIn ? (
                  <>
                      <Link to="/Web1" class="nav-link">Accueil</Link>
                      <Link to="/api" class="nav-link">Carte</Link>
                      <Link to="/contact" class="nav-link">Contact</Link>
                      <Link to="/apropos" class="nav-link">A propos</Link>
                      <Link to={`/profil?id=${window.myGlobalLoginId}`} class="nav-link">
                          <Avatar src='https://bit.ly/broken-link' size="lg" >
                              <AvatarBadge boxSize="1em" bg="green.300"/>
                          </Avatar>
                      </Link>
                  </>
                  ) : (
                  <>
                      <Link to="/Web1" class="nav-link">Accueil</Link>
                      <Link to="/api" class="nav-link">Carte</Link>
                      <Link to="/contact" class="nav-link">Contact</Link>
                      <Link to="/apropos" class="nav-link">A propos</Link>
                      <Link to="/connexion" class="nav-link">
                          <Avatar src='https://bit.ly/broken-link' size="lg" >
                              <AvatarBadge boxSize="1em" bg="tomato"/>
                          </Avatar>
                      </Link>
                          
                      
                  </>
                  )}
                  <button className='nav-btn nav-close-btn' onClick={showNavbar}> 
                      <FaTimes /> 
                  </button>
              </nav>
              <button className='nav-btn'  onClick={showNavbar} > 
              <FaBars /> 
              </button>     
              </header>
        </ChakraProvider>


    <section className="contain">
    <h3>Vous allez être redirigé <br />vers la <br /> page de connexion.</h3>
    </section>

    <footer className="footer">
        <div className="box-container">

            <div className="box">
                <h3>navigation</h3>
                <Link to="/Web1" className="fas fa-arrow-right">Accueil</Link>
                <Link to="/api" className="fas fa-arrow-right">Carte</Link>
                <Link to="/contact" className="fas fa-arrow-right">Contact</Link>
                <Link to="/apropos" className="fas fa-arrow-right">A propos</Link>
                <Link to="/connexion" className="fas fa-arrow-right">Se connecter</Link>
            </div>

            <div className="box">
                <h3>Contact</h3>
                <p> 01 02 03 04 05</p>
                <p>143 avenue de Versaille, 75016 Paris</p>
                <p>jms@voirdesavions.fr</p>
                <br />
                <p>Inscrivez-vous à notre newsletter</p>
                <input type="email" name="newsletter" id="newsletter" placeholder='Votre mail' onChange={handleChangeNewsletter}/>
            </div>

            <div className="box">
                <h3>Suivez-nous</h3>
                <a href="#"><i className="fab fa-linkedin-in"></i>linkedin</a>
                <a href="#"><i className="fab fa-facebook-f"></i>facebook</a>
                <a href="#"><i className="fab fa-instagram"></i>instagram</a>
                <a href="#"><i className="fab fa-twitter"></i>twitter</a>
            </div>
        </div>
        <div align="center"><div className="log"><a href="#" className="logo"><img src={airplane} alt="" onClick={newsletterSend}/></a></div></div>
        {responseNews ? <p>{responseNews}</p> : null}
        <div className="credit">created by <span> Jordan | Sathusan | Mathis | </span></div>


    </footer>


    <script src="Home.js"></script>

    </>





    
    )
}

export default Sedeconnecter;
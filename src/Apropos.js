import {BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import airplane from './image/airplane.png'
import iut from './image/iut.jpeg'
import './Apropos.css'
import React, { useEffect, useRef, useState } from 'react';
import {FaBars , FaTimes} from "react-icons/fa"
import {ChakraProvider, Box, Text, Avatar, AvatarBadge, Stack } from '@chakra-ui/react'
import Jordan from './image/Jordan.jpeg'
import Mathis from './image/Mathis.jpg'
import Sathusan from './image/Sathusan.jpg'

const Apropos=()=>{
    

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
                    <Link to="/Web" class="nav-link">Accueil</Link>
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
                    <Link to="/Web" class="nav-link">Accueil</Link>
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


        <section className="presite">
            <h3>A propos </h3>
        </section>

        <section className="projet">
            <div className="text">
                <h3>Notre projet étudiant</h3>
                <p>Nous avions pour objectif de développer un site web en intégrant du backend au frontend en utilisant une API et les technologies suivantes : HTML, CSS, Javascript, ReactJS, Node.js, PHP.</p>
            </div>
            <div className="images">
            <img src={iut} alt=""/>
            </div>
        </section>

        <section className="prequipe">
            <h3>Notre équipe </h3>
            <p>Nous sommes une équipe de trois développeurs étudiant à l'IUT Paris Cité : Jordan Dohou, Mathis Baumert et Sathusan Krishnapakaran </p>
            <br /> <br /> <br />
            
           
            <div className='image_profil'>
                <img src={Jordan} alt="Jordan" style={{ width: '200px', height:'200px', border: '4px solid white', borderRadius:' 50%' }} /> <br /><br />
                <img src={Mathis} alt="Mathis" style={{ width: '200px', height:'200px', border: '4px solid white', borderRadius:' 50%' }} /> <br /><br />
                <img src={Sathusan} alt="Sathusan" style={{ width: '200px', height:'200px', border: '4px solid white', borderRadius:' 50%' }} /> <br /><br />
            </div>
         
            
        </section>

        <footer className="footer">
        <div className="box-container">

            <div className="box">
                <h3>navigation</h3>
                <Link to="/Web" className="fas fa-arrow-right">Accueil</Link>
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

export default Apropos;
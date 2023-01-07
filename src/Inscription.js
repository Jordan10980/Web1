import React, { useState, useEffect, useRef } from 'react';
import {BrowserRouter as Router, Routes, Route, Link, json, useNavigate } from 'react-router-dom';
import './Inscription.css'
import airplane from './image/airplane.png'
import {FaBars , FaTimes} from "react-icons/fa"
import {ChakraProvider, Box, Text, Avatar, AvatarBadge, Stack } from '@chakra-ui/react'

function Inscription() {

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


  const [formData, setFormData] = useState({
    pseudo: '',
    mail: '',
    mail2: '',
    mdp: '',
    mdp2: '',
  });
  
  const [response, setResponse] = useState(null);
  
  const navigate = useNavigate();
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((formData) => ({ ...formData, [name]: value }));
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost/php/inscription.php", {
      method: 'POST',
      body: JSON.stringify({
        data: formData,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.text())
      .then((data) => {
        setResponse(data);
        if (data === 'Bravo vous êtes inscrit') {
          setResponse(<p class="valid">Votre compte a bien été crée ! <Link to="/connexion" class="valid2">Me connecter</Link></p>);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

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
 
  
    

  return (
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
        <h3>Inscription</h3>
    </section>

    <div>
    <section className="inscription_form">

        <form onSubmit={handleSubmit}>
            
            <input type="text" placeholder="Votre pseudo" id="pseudo" name="pseudo" onChange={handleChange}/>
        <br />
            <input type="email" placeholder="Votre mail" id="mail" name="mail" onChange={handleChange} />
        <br />
            <input type="email" placeholder="Confirmez votre email" id="mail2" name="mail2" onChange={handleChange}/>
        <br />
            <input type="password" placeholder="Votre mot de passe" id="mdp" name="mdp" onChange={handleChange} />
        <br />
            <input type="password" placeholder="Confirmez votre mdp" id="mdp2" name="mdp2" onChange={handleChange} />
        <br />

        <input type="submit" name="forminscription" id="btn" value="Je m'inscris"/>

        </form>
        
        {response ? <p>{response}</p> : null}

    </section>
    </div>


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

  );
}

export default Inscription;

import React, { useState, useEffect, useRef } from 'react';
import {BrowserRouter as Router, Routes, Route, Link, json, useNavigate, useLocation } from 'react-router-dom';
import airplane from './image/airplane.png'
import './Editionprofil.css'
import {FaBars , FaTimes} from "react-icons/fa"
import {ChakraProvider, Box, Text, Avatar, AvatarBadge, Stack } from '@chakra-ui/react'


const Editionprofil=()=>{

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

  const [pseudo, setPseudo] = useState(window.myGlobalPseudo);
  const [mail, setMail] = useState(window.myGlobalMail);

    const [formData, setFormData] = useState({
        id:window.myGlobalId,
        newpseudo: pseudo,
        newmail: mail,
        newmdp1: '',
        newmdp2: '',
      });
      const [response, setResponse] = useState(null);
      
      const navigate = useNavigate();
      
      const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((formData) => ({ ...formData, [name]: value }));
        if (name === "newpseudo") {
            setPseudo(event.target.value);
          }
        if (name === "newmail") {
          setMail(event.target.value);
        }
      };

      const handleSubmit = (event) => {
           event.preventDefault();

           fetch("http://localhost/php/editionprofil.php", {
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

              if (data.includes("Votre pseudo a bien été modifié\n")) {
              // console.log(data);
              setTimeout(() => {
                navigate(`/profil?id=${window.myGlobalId}`);
              }, 1300);
            }
            else if (data.includes("Votre adresse mail a bien été modifié\n")) {
              // console.log(data);
              setTimeout(() => {
                navigate(`/profil?id=${window.myGlobalId}`);
              }, 1300);
            }
            else if (data.includes("Votre mot de passe a bien été modfifié !\n")) {
              // console.log(data);
              setTimeout(() => {
                navigate(`/profil?id=${window.myGlobalId}`);
              }, 1300);
            }else{
              setResponse(data);
              console.log(data);
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
        <h3>Edition du profil</h3>
        <p className='info'>!!! Vous aurez bientôt la possibilité de changer l'image de votre avatar !!!</p>
        <br /><br />
    </section>

    <section className="edition_profil">
        <form onSubmit={handleSubmit} enctype="multipart/form-data">
            
            <input type="text" placeholder="Nouveau pseudo" name="newpseudo" value={pseudo} onChange={handleChange} />
        <br /> <br />
            <input type="email" placeholder="Nouveau mail" name="newmail" value={mail} onChange={handleChange}  />
        <br /> <br />
            <input type="password" placeholder="Nouveau mot de passe" name="newmdp1" onChange={handleChange} />
        <br /> <br />
            <input type="password" placeholder="Confirmez votre mdp" name="newmdp2" onChange={handleChange} />
        <br /><br />

        <input type="submit" name="editprofil" id="btn1" value="Mettre à jour mon profil !"/>

        </form>
        
        {response ? <p>{response}</p> : null}

        <br />
        <br />


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

export default Editionprofil;
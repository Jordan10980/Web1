import {BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import airplane from './image/airplane.png'
import './Api.css'
import React, { useEffect, useRef, useState } from 'react';
import {FaBars , FaTimes} from "react-icons/fa"
import LE from "leaflet";
import { OpenSkyApi } from 'opensky-api';
import {Marker} from "react-leaflet";
import * as L from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import RotatedMarker from 'leaflet-rotatedmarker';
import {ChakraProvider, Box, Text, Avatar, AvatarBadge, Stack } from '@chakra-ui/react'
import InputAuto from "./InputAuto";


const Api=()=>{

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
    

    const [planes, setPlanes] = useState([]);
    const [center] = useState([48.86411350753889, 2.328941978549886]);
    const planeIcon = new LE.Icon({
        iconUrl: require("./static/icons/plane.png"),
        iconSize: [15, 15]
    });
    const [result, setResult] = useState('France');
    const countryList = [
        "Afghanistan",
        "Albania",
        "Algeria",
        "American Samoa",
        "Andorra",
        "Angola",
        "Anguilla",
        "Antarctica",
        "Antigua and Barbuda",
        "Argentina",
        "Armenia",
        "Aruba",
        "Australia",
        "Austria",
        "Azerbaijan",
        "Bahamas",
        "Bahrain",
        "Bangladesh",
        "Barbados",
        "Belarus",
        "Belgium",
        "Belize",
        "Benin",
        "Bermuda",
        "Bhutan",
        "Bolivia",
        "Bonaire, Sint Eustatius and Saba",
        "Bosnia and Herzegovina",
        "Botswana",
        "Bouvet Island",
        "Brazil",
        "British Indian Ocean Territory",
        "Brunei Darussalam",
        "Bulgaria",
        "Burkina Faso",
        "Burundi",
        "Cabo Verde",
        "Cambodia",
        "Cameroon",
        "Canada",
        "Cayman Islands",
        "Central African Republic",
        "Chad",
        "Chile",
        "China",
        "Christmas Island",
        "Cocos Islands",
        "Colombia",
        "Comoros",
        "Congo",
        "Cook Islands",
        "Costa Rica",
        "Croatia",
        "Cuba",
        "Curaçao",
        "Cyprus",
        "Czechia",
        "Côte d'Ivoire",
        "Denmark",
        "Djibouti",
        "Dominica",
        "Dominican Republic",
        "Ecuador",
        "Egypt",
        "El Salvador",
        "Equatorial Guinea",
        "Eritrea",
        "Estonia",
        "Eswatini",
        "Ethiopia",
        "Falkland Islands",
        "Faroe Islands",
        "Fiji",
        "Finland",
        "France",
        "French Guiana",
        "French Polynesia",
        "French Southern Territories",
        "Gabon",
        "Gambia",
        "Georgia",
        "Germany",
        "Ghana",
        "Gibraltar",
        "Greece",
        "Greenland",
        "Grenada",
        "Guadeloupe",
        "Guam",
        "Guatemala",
        "Guernsey",
        "Guinea",
        "Guinea-Bissau",
        "Guyana",
        "Haiti",
        "Heard Island and McDonald Islands",
        "Holy See",
        "Honduras",
        "Hong Kong",
        "Hungary",
        "Iceland",
        "India",
        "Indonesia",
        "Iran",
        "Iraq",
        "Ireland",
        "Isle of Man",
        "Israel",
        "Italy",
        "Jamaica",
        "Japan",
        "Jersey",
        "Jordan",
        "Kazakhstan",
        "Kenya",
        "Kiribati",
        "Korea",
        "Kuwait",
        "Kyrgyzstan",
        "Lao People's Democratic Republic",
        "Latvia",
        "Lebanon",
        "Lesotho",
        "Liberia",
        "Libya",
        "Liechtenstein",
        "Lithuania",
        "Luxembourg",
        "Macao",
        "Madagascar",
        "Malawi",
        "Malaysia",
        "Maldives",
        "Mali",
        "Malta",
        "Marshall Islands",
        "Martinique",
        "Mauritania",
        "Mauritius",
        "Mayotte",
        "Mexico",
        "Micronesia",
        "Moldova",
        "Monaco",
        "Mongolia",
        "Montenegro",
        "Montserrat",
        "Morocco",
        "Mozambique",
        "Myanmar",
        "Namibia",
        "Nauru",
        "Nepal",
        "Netherlands",
        "New Caledonia",
        "New Zealand",
        "Nicaragua",
        "Niger",
        "Nigeria",
        "Niue",
        "Norfolk Island",
        "Northern Mariana Islands",
        "Norway",
        "Oman",
        "Pakistan",
        "Palau",
        "Palestine, State of",
        "Panama",
        "Papua New Guinea",
        "Paraguay",
        "Peru",
        "Philippines",
        "Pitcairn",
        "Poland",
        "Portugal",
        "Puerto Rico",
        "Qatar",
        "Republic of North Macedonia",
        "Romania",
        "Russian Federation",
        "Rwanda",
        "Réunion",
        "Saint Barthélemy",
        "Saint Helena, Ascension and Tristan da Cunha",
        "Saint Kitts and Nevis",
        "Saint Lucia",
        "Saint Martin",
        "Saint Pierre and Miquelon",
        "Saint Vincent and the Grenadines",
        "Samoa",
        "San Marino",
        "Sao Tome and Principe",
        "Saudi Arabia",
        "Senegal",
        "Serbia",
        "Seychelles",
        "Sierra Leone",
        "Singapore",
        "Sint Maarten",
        "Slovakia",
        "Slovenia",
        "Solomon Islands",
        "Somalia",
        "South Africa",
        "South Georgia and the South Sandwich Islands",
        "South Sudan",
        "Spain",
        "Sri Lanka",
        "Sudan",
        "Suriname",
        "Svalbard and Jan Mayen",
        "Sweden",
        "Switzerland",
        "Syrian Arab Republic",
        "Taiwan",
        "Tajikistan",
        "Tanzania",
        "Thailand",
        "Timor-Leste",
        "Togo",
        "Tokelau",
        "Tonga",
        "Trinidad and Tobago",
        "Tunisia",
        "Turkey",
        "Turkmenistan",
        "Turks and Caicos Islands",
        "Tuvalu",
        "Uganda",
        "Ukraine",
        "United Arab Emirates",
        "United Kingdom",
        "United States Minor Outlying Islands",
        "United States",
        "Uruguay",
        "Uzbekistan",
        "Vanuatu",
        "Venezuela",
        "Viet Nam",
        "Virgin Islands",
        "Wallis and Futuna",
        "Western Sahara",
        "Yemen",
        "Zambia",
        "Zimbabwe",
        "Åland Islands"
    ];

    const getSelectedVal = (value) => {
        setResult(value)
    };


    useEffect(() => {
        const api = new OpenSkyApi();
        api
            .getStates()
            .then((response) => {
                setPlanes(response.states);
            });
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            const api = new OpenSkyApi();
            api
                .getStates()
                .then((response) => {
                    if (response.states!== null) {
                        setPlanes(response.states);
                    }
                });
        }, 60000);

        return () => clearInterval(interval);
    }, []);

    const markers = planes.length > 0 && planes.map((plane) => {
        if (plane.latitude && plane.longitude && plane.originCountry.toLowerCase().includes(result.toLowerCase())){
            const rotationAngle = plane.heading;
            return (
                    <Marker
                        key={plane.icao24}
                        position={[plane.latitude, plane.longitude]}
                        icon={planeIcon}
                        rotationAngle={rotationAngle}
                        >
                        <L.Popup>
                            <div>
                            <p className='info_titre'>Informations sur le vol</p>
                                <p className='info'>Numéro de vol: {plane.callsign}</p>
                                <p className='info'>Pays d'origine: {plane.originCountry}</p>
                                <p className='info'>Altitude: {plane.geoAltitude} mètres</p>
                                <p className='info'>Vitesse: {plane.velocity} km/h</p>
                                <p className='info'>Cap: {plane.heading} degrés</p>
                            </div>
                        </L.Popup>
                    </Marker>
                );
        }
        return null;
    });

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

         <section className="contain">
        

                <div style={{marginTop: '50px'}}>

        <L.MapContainer
            center={center}
            zoom={6}
            style={{ height: '65vh', width: '100wh', zIndex: '0'}} >
            <L.TileLayer
                url="https://api.maptiler.com/maps/voyager-v2/{z}/{x}/{y}.png?key=cYHT2pYOApRNeD4phpPT"
                attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
            />
            {markers}
        </L.MapContainer>
            <InputAuto
                label={'Rechercher un pays'}
                pholder="Rechercher un pays d'origine"
                data={countryList}
                onSelected={getSelectedVal}
            />
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

export default Api;
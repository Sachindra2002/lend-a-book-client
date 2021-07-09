import React, { useState } from 'react'
import {Link} from 'react-router-dom';
import { Button } from '../Button/Button';
import './Navbar.css';
import Home from '../../pages/Home/Home';
import HeroSection from '../Hero Section/HeroSection';
 

function Navbar() {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
        if(window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    };

    window.addEventListener('resize', showButton);

    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    <Link to="/" className="navbar-logo">
                        {/* <img width="150px" src={logo} alt="Logo"/> */}
                        𝐿𝑒𝓃𝒹 𝒶 𝐵𝑜𝑜𝓀
                    </Link>
                    <div className="menu-icon" onClick={handleClick}>
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'}/>
                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li>
                            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                                 Home
                            </Link>
                        </li>
                        <li>
                            <Link to='/sign-in' className='nav-links' onClick={closeMobileMenu}>
                                Sign In
                            </Link>
                        </li>
                        <li>
                            <Link to='/register' className='special-button' onClick={closeMobileMenu}>
                                Sign Up
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    ); 
}

export default Navbar

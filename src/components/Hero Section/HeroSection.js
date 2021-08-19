import React from 'react';
import { Link } from 'react-router-dom';
import '../../App.scss';
import './HeroSection.css';


function HeroSection() {
    return (
        <div className="hero-container">
            <h1>A world of books for young and old.</h1>
            <p>Read, Lead, Succeed.</p>
            <div className="hero-btns">
                <Link to="/register">
                <button className="btn--outline">
                    Sign Up
                </button>
                </Link>
            </div>
        </div>
    )
}

export default HeroSection

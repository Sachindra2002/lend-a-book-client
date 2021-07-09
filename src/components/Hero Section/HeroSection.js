import React from 'react';
import '../../App.css';
import './HeroSection.css';


function HeroSection() {
    return (
        <div className="hero-container">
            <h1>A world of books for young and old.</h1>
            <p>Read, Lead, Succeed.</p>
            <div className="hero-btns">

                <button className="btn--outline">
                    Sign Up
                </button>
            </div>
        </div>
    )
}

export default HeroSection

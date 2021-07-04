import React from 'react';
import '../../App.css';
import { Button } from '../Button/Button';
import './HeroSection.css';


function HeroSection() {
    return (
        <div className="hero-container">
            <h1>A world of books for young and old.</h1>
            <p>Read, Lead, Succeed.</p>
            <div className="hero-btns">
                <Button className="btns" buttonStyle="btn--outline" buttonSize="btn--large">
                    Get Started
                </Button>
                <Button className="btns" buttonStyle="btn--primary" buttonSize="btn--large">
                    Sign Up
                </Button>
            </div>
        </div>
    )
}

export default HeroSection

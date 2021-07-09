import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import '../../App.css';
import Footer from '../../components/Footer/Footer';
import HeroSection from '../../components/Hero Section/HeroSection';
import MembershipCard from '../../components/MembershipCards/MembershipCard';
import Navbar from '../../components/Navbar/Navbar';

function Home () {
    return (
        <>
        <Navbar />
            <Router>
                <HeroSection/>
                <MembershipCard/>
                <Footer/>   
            </Router>
        </>
    )
}

export default Home;
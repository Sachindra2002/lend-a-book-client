import React from "react";
import "../../App.css";
import Footer from "../../components/Footer/Footer";
import HeroSection from "../../components/Hero Section/HeroSection";
import MembershipCard from "../../components/MembershipCards/MembershipCard";
import Navbar from "../../components/Navbar/Navbar";

function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <MembershipCard />
      <Footer />
    </>
  );
}

export default Home;

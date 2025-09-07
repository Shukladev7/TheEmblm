import React from 'react';
import Hero from '../components/Hero';
import AboutSection from '../components/AboutSection';
import Services from '../components/Services';
import SignatureWorks from '../components/SignatureWorks';
import Testimonials from '../components/Testimonials';
import Team from '../components/Team';
import FloatingWeDesign from '../components/FloatingWeDesign';

const Home = () => {
  return (
    <div className="pt-16">
      
      <Hero />
      <AboutSection />
      <Services />
      <SignatureWorks />
      <Testimonials />
      <Team /> 
      <FloatingWeDesign />
    </div>
  );
};

export default Home;
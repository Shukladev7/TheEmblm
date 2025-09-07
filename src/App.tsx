import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import FloatingWeDesign from './components/FloatingWeDesign';
import Home from './pages/Home';
import About from './pages/About';
import Work from './pages/Work';
import ThoughtHub from './pages/ThoughtHub';
import Contact from './pages/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/cursor';
function App() {
  return (

    <Router>
      <div className="min-h-screen bg-white">
        <CustomCursor />
        <Navbar />
        <Routes>
          
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/work" element={<Work />} />
          <Route path="/thought-hub" element={<ThoughtHub />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
       
        <Footer />
      </div>
    </Router>
  );
}

export default App;
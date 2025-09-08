import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Work from "./pages/Work";
import ThoughtHub from "./pages/ThoughtHub";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import CustomCursor from "./components/cursor";

import CategoryPage from "./pages/CategoryPage";
import { CATEGORIES } from "./data/categories";

const App: React.FC = (): JSX.Element => {
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

          {/* Static category routes */}
          {CATEGORIES.map((c) => (
            <Route
              key={c.path}
              path={`/${c.path}`}
              element={<CategoryPage name={c.name} />}
            />
          ))}

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
};

export default App;

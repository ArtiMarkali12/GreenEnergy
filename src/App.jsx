import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import Footer from "./components/footer/Footer";
import About from "./pages/about/About";
import ContactPage from "./pages/contact/Contact";
import BlogPage from "./pages/blogs/Blog";
import BiomassBriquettes from "./pages/service_page/BiomassBriquettes";
import BiomassPellet from "./pages/service_page/BiomassPellet";
import DryCoconutShell from "./pages/service_page/DryCoconutShell";
import CocoCharcoal from "./pages/service_page/CocoCharcoal";
import ActivatedCharcoal from "./pages/service_page/ActivatedCharcoal";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/blogs" element={<BlogPage />} />

        {/* Individual Product Routes */}
        <Route path="/product/biomass-briquettes" element={<BiomassBriquettes />} />
        <Route path="/product/biomass-pellet" element={<BiomassPellet />} />
        <Route path="/product/dry-coconut-shell" element={<DryCoconutShell />} />
        <Route path="/product/coconut-shell-charcoal" element={<CocoCharcoal />} />
        <Route path="/product/activated-charcoal" element={<ActivatedCharcoal />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
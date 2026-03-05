// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import "./home.css";

// // ✅ Correct Image Imports
// import cocoShell from "../../assets/images/coco_shell.png";
// import cocoWood from "../../assets/images/coco_wood2.png";
// import dc1 from "../../assets/images/dc1.png";

// const images = [cocoShell, cocoWood, dc1];

// export default function Home() {
//   const [current, setCurrent] = useState(0);

//   // Auto Slide Effect
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrent((prev) => (prev + 1) % images.length);
//     }, 4000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="hero-container">

//       {/* Background Image Carousel */}
//       <AnimatePresence mode="wait">
//         <motion.img
//           key={current}
//           src={images[current]}
//           alt="Green Energy Slide"
//           className="hero-image"
//           initial={{ opacity: 0, scale: 1.1 }}
//           animate={{ opacity: 1, scale: 1 }}
//           exit={{ opacity: 0 }}
//           transition={{ duration: 1.5 }}
//         />
//       </AnimatePresence>

//       {/* Dark Overlay */}
//       <div className="hero-overlay"></div>

//       {/* Content */}
//       <div className="hero-content">
//         <motion.h1
//           initial={{ y: 40, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 1 }}
//         >
//           Om Green Energy
//         </motion.h1>

//         <motion.p
//           initial={{ y: 40, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.4, duration: 1 }}
//         >
//           Powering Tomorrow with Sustainable & Renewable Energy Solutions
//         </motion.p>

//         <motion.button
//           initial={{ y: 40, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.8, duration: 1 }}
//           className="hero-btn"
//         >
//           Get Quote
//         </motion.button>
//       </div>

//     </div>
//   );
// }








// import { useState, useEffect } from "react";
// import "./home.css";

// import cocoShell from "../../assets/images/charcoal.png";
// import cocoWood from "../../assets/images/coco_wood2.png";
// import dc1 from "../../assets/images/dc1.png";
// import { useNavigate } from "react-router-dom";


// const images = [cocoShell, cocoWood, dc1];

// export default function Home() {


//     useEffect(() => {
//   const items = document.querySelectorAll(".timeline-item");

//   const observer = new IntersectionObserver(
//     (entries) => {
//       entries.forEach((entry) => {
//         if (entry.isIntersecting) {
//           entry.target.classList.add("show");
//         }
//       });
//     },
//     { threshold: 0.2 }
//   );

//   items.forEach((item) => observer.observe(item));

//   return () => {
//     items.forEach((item) => observer.unobserve(item));
//   };
// }, []);






// // ==============================================



//   const [current, setCurrent] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrent((prev) => (prev + 1) % images.length);
//     }, 4000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <>
//       {/* ================= HERO SECTION ================= */}
//       {/* <div className="hero-container">
//         <div
//           className="hero-bg"
//           style={{ backgroundImage: `url(${images[current]})` }}
//         ></div>

//         <div className="hero-overlay"></div>

//         <div className="hero-content">
//           <h1>Om Green Energy</h1>
//           <p>
//             Powering Tomorrow with Sustainable & Renewable Energy Solutions
//           </p>
//           <button className="hero-btn">Get Quote</button>
//         </div>
//       </div> */}


//       <div
//   className="hero-container"
//   style={{ backgroundImage: `url(${images[current]})` }}
// >
//   <div className="hero-overlay"></div>

//   <div className="hero-content">
//     <h1>Om Green Energy</h1>
//     <p>
//       Powering Tomorrow with Sustainable & Renewable Energy Solutions
//     </p>
//     <button className="hero-btn">Get Quote</button>
//   </div>
// </div>

//       {/* ================= CARDS SECTION ================= */}
//       <section className="services-section">
//         <h2 className="section-title">Our Core Services</h2>

//         <div className="services-container">
//           <div className="service-card">
//             <h3>Coconut Shell Processing</h3>
//             <p>
//               High-quality coconut shell collection and eco-friendly
//               processing for sustainable energy production.
//             </p>
//           </div>

//           <div className="service-card">
//             <h3>Biomass Fuel Supply</h3>
//             <p>
//               Supplying premium biomass fuel solutions to industries for
//               efficient and green power generation.
//             </p>
//           </div>

//           <div className="service-card">
//             <h3>Renewable Consulting</h3>
//             <p>
//               Expert guidance for businesses to shift towards renewable and
//               sustainable energy systems.
//             </p>
//           </div>
//         </div>
//       </section>



// {/* ================= TIMELINE PROCESS SECTION ================= */}
// <section className="timeline-section">
//   <h2 className="section-title">Our Working Process</h2>

//   <div className="timeline">

//     <div className="timeline-item">
//       <div className="timeline-dot"></div>
//       <div className="timeline-content">
//         <h3>Raw Material Collection</h3>
//         <p>We collect high quality coconut shells from trusted sources.</p>
//       </div>
//     </div>

//     <div className="timeline-item">
//       <div className="timeline-dot"></div>
//       <div className="timeline-content">
//         <h3>Eco Processing</h3>
//         <p>Shells are processed using sustainable and clean technology.</p>
//       </div>
//     </div>

//     <div className="timeline-item">
//       <div className="timeline-dot"></div>
//       <div className="timeline-content">
//         <h3>Distribution</h3>
//         <p>Efficient delivery of biomass fuel to industries nationwide.</p>
//       </div>
//     </div>

//   </div>
// </section>



      
//     </>
//   );
// }















import { useState, useEffect } from "react";
import "./home.css";

// import cocoShell from "../../assets/images/charcoal.png";

import cocoShell  from "../../assets/images/coco_wood2.png";
import cocoWood from "../../assets/images/ban1.png";
import dc1 from "../../assets/images/dc1.png";

const images = [cocoShell, cocoWood, dc1];

export default function Home() {

  useEffect(() => {
    const items = document.querySelectorAll(".timeline-item");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      { threshold: 0.2 }
    );

    items.forEach((item) => observer.observe(item));

    return () => {
      items.forEach((item) => observer.unobserve(item));
    };
  }, []);

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* HERO SECTION */}
      <div
        className="hero-container"
        style={{ backgroundImage: `url(${images[current]})` }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Om Green Energy</h1>
          <p>
            Sustainable Coconut & Biomass Fuel Solutions for Industrial Applications
          </p>
        </div>
      </div>

      {/* ================= RAW MATERIAL SECTION ================= */}
      <section className="services-section">
        <h2 className="section-title">Raw Materials</h2>

        <div className="services-container">
          <div className="service-card">
            <h3>Dry Coconut Shell</h3>
            <p>
              High-quality coconut shells collected from trusted sources.
              Ideal for charcoal production and biomass processing.
            </p>
          </div>

          <div className="service-card">
            <h3>Coconut Charcoal</h3>
            <p>
              Premium grade charcoal with high calorific value and low ash content,
              suitable for industrial heating and export markets.
            </p>
          </div>

          <div className="service-card">
            <h3>Activated Charcoal</h3>
            <p>
              Processed coconut-based activated carbon used in water purification,
              air filtration, and industrial adsorption applications.
            </p>
          </div>
        </div>
      </section>

      {/* ================= BIOMASS PELLETS ================= */}
  <section className="product-hero">
  <div className="product-overlay">
    <h2>Biomass Pellets</h2>
    <p>
      High-efficiency renewable fuel designed for industrial heating,
      power plants and commercial energy applications.
    </p>
  </div>

  <div className="spec-cards">
    <div className="spec-card">
      <h3>8-12 mm</h3>
      <span>Diameter</span>
    </div>

    <div className="spec-card">
      <h3>≤ 10%</h3>
      <span>Moisture</span>
    </div>

    <div className="spec-card">
      <h3>14–18 MJ/kg</h3>
      <span>Calorific Value</span>
    </div>

    <div className="spec-card">
      <h3>600–750</h3>
      <span>Bulk Density (kg/m³)</span>
    </div>
  </div>
</section>


      {/* ================= BIOMASS BRIQUETTES ================= */}
      {/* ================= BIOMASS BRIQUETTES ================= */}
<section className="briquettes-section">
  <h2 className="briquettes-title">Biomass Briquettes Specifications</h2>

  <div className="briquettes-table-wrapper">
    <table className="briquettes-table">
      <thead>
        <tr>
          <th>Parameter</th>
          <th>Typical Range</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>Diameter</td><td>50 – 100 mm</td></tr>
        <tr><td>Length</td><td>50 – 300 mm</td></tr>
        <tr><td>Moisture</td><td>&lt; 10 – 12%</td></tr>
        <tr><td>Calorific Value</td><td>3500 – 4500 kcal/kg</td></tr>
        <tr><td>Ash Content</td><td>5 – 10%</td></tr>
        <tr><td>Bulk Density</td><td>600 – 750 kg/m³</td></tr>
      </tbody>
    </table>
  </div>
</section>

      {/* ================= PROCESS TIMELINE ================= */}
      {/* <section className="timeline-section">
        <h2 className="section-title">Our Working Process</h2>

        <div className="timeline">

          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <h3>Raw Material Collection</h3>
              <p>Collection of coconut shells and agricultural residues.</p>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <h3>Processing & Quality Control</h3>
              <p>Advanced compression and carbonization processes with strict quality checks.</p>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <h3>Distribution</h3>
              <p>Reliable supply to industries, boilers, power plants and export markets.</p>
            </div>
          </div>

        </div>
      </section> */}


      {/* ================= PROCESS TIMELINE ================= */}
<section className="process-timeline-section">
  <h2 className="timeline-title">Our Working Process</h2>

  <div className="process-timeline">

    <div className="process-step">
      <div className="step-indicator"></div>
      <div className="step-content">
        <h3>Raw Material Collection</h3>
        <p>Collection of coconut shells and agricultural residues.</p>
      </div>
    </div>

    <div className="process-step">
      <div className="step-indicator"></div>
      <div className="step-content">
        <h3>Processing & Quality Control</h3>
        <p>Advanced compression and carbonization processes with strict quality checks.</p>
      </div>
    </div>

    <div className="process-step">
      <div className="step-indicator"></div>
      <div className="step-content">
        <h3>Distribution</h3>
        <p>Reliable supply to industries, boilers, power plants and export markets.</p>
      </div>
    </div>

  </div>
</section>

    </>
  );
}
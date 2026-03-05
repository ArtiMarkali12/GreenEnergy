// // src/pages/about/About.jsx
// import React, { useEffect } from "react";
// import "./about.css";
// import aboutImg from "../../assets/images/coco3.png";
// import aboutImg2 from "../../assets/images/coco2.png";
// import charcoalImg from "../../assets/images/charcoal.png"; // add image
// import activatedImg from "../../assets/images/dc1.png"; // add image

// const About = () => {

//   useEffect(() => {
//     const reveal = () => {
//       const elements = document.querySelectorAll(".fade-up");
//       elements.forEach((el) => {
//         const windowHeight = window.innerHeight;
//         const elementTop = el.getBoundingClientRect().top;
//         if (elementTop < windowHeight - 100) {
//           el.classList.add("active");
//         }
//       });
//     };

//     window.addEventListener("scroll", reveal);
//     reveal();
//   }, []);

//   return (
//     <div className="about-page">

//       {/* HERO */}
//       <section className="about-hero">
//         <div className="about-hero-overlay fade-up">
//           <h1>About Our Company</h1>
//           <p>
//             We deliver sustainable coconut-based raw materials, biomass pellets,
//             coconut charcoal, and activated charcoal solutions for global industries.
//           </p>
//         </div>
//       </section>

//       {/* WHO WE ARE */}
//       <section className="about-section fade-up">
//         <div className="about-container">
//           <div className="about-text">
//             <h2>Who We Are</h2>
//             <p>
//               We are a trusted supplier of premium coconut-derived products,
//               committed to sustainability, quality, and innovation.
//             </p>
//             <p>
//               Our expertise spans across coconut shell charcoal, activated
//               carbon, biomass pellets, and other eco-friendly raw materials
//               serving domestic and international markets.
//             </p>
//             <p>
//               With advanced processing techniques and strict quality control,
//               we ensure consistent performance and reliability.
//             </p>
//           </div>

//           <div className="about-image">
//             <img src={aboutImg} alt="Company" />
//           </div>
//         </div>
//       </section>

//      {/* MISSION */}
// <section className="about-mission fade-up">
//   <div className="mission-container">

//     <div className="mission-image">
//       <img src={aboutImg2} alt="Mission" />
//     </div>

//     <div className="mission-text">
//       <h2>Our Mission</h2>
//       <p>
//         To promote sustainable energy and eco-friendly raw materials
//         that reduce environmental impact while supporting industrial growth.
//       </p>
//       <p>
//         We aim to provide renewable alternatives to conventional fuels,
//         helping industries transition toward greener operations.
//       </p>
//     </div>

//   </div>
// </section>

//       {/* COCONUT CHARCOAL */}
//       <section className="product-section fade-up">
//         <div className="product-content">
//           <div className="product-text">
//             <h2>Coconut Charcoal</h2>
//             <p>
//               Our coconut shell charcoal is produced using high-temperature
//               carbonization to ensure high carbon content and low ash levels.
//             </p>
//             <p>
//               It is widely used in BBQ, industrial fuel, and metal processing
//               industries due to its superior burning efficiency and low smoke emission.
//             </p>
//             <p>
//               Coconut charcoal is renewable, eco-friendly, and offers
//               longer burning time compared to traditional wood charcoal.
//             </p>
//           </div>
//           <div className="product-image">
//             <img src={charcoalImg} alt="Coconut Charcoal" />
//           </div>
//         </div>
//       </section>

//       {/* ACTIVATED CHARCOAL */}
//       <section className="product-section reverse fade-up">
//         <div className="product-content">
//           <div className="product-text">
//             <h2>Activated Charcoal</h2>
//             <p>
//               Our activated charcoal is derived from premium coconut shells
//               and processed using advanced steam activation technology.
//             </p>
//             <p>
//               It offers excellent adsorption capacity and is widely used in
//               water purification, air filtration, gold recovery, pharmaceuticals,
//               and food processing industries.
//             </p>
//             <p>
//               With high surface area and consistent quality, our activated
//               carbon ensures maximum performance and safety.
//             </p>
//           </div>
//           <div className="product-image">
//             <img src={activatedImg} alt="Activated Charcoal" />
//           </div>
//         </div>
//       </section>

//       {/* VALUES */}
//       <section className="about-values fade-up">
//         <h2>Our Core Values</h2>
//         <div className="values-grid">

//           <div className="value-card">
//             <h3>🌱 Sustainability</h3>
//             <p>Responsible sourcing and renewable production methods.</p>
//           </div>

//           <div className="value-card">
//             <h3>⭐ Quality Assurance</h3>
//             <p>Strict quality control at every stage of production.</p>
//           </div>

//           <div className="value-card">
//             <h3>🤝 Integrity</h3>
//             <p>Transparent and ethical business relationships.</p>
//           </div>

//           <div className="value-card">
//             <h3>🚀 Innovation</h3>
//             <p>Continuous improvement using modern technologies.</p>
//           </div>

//         </div>
//       </section>

//     </div>
//   );
// };

// export default About;





import React from "react";
import "./about.css";
import missionImg from "../../assets/images/coco1.png";
import charcoalImg from "../../assets/images/activated.jpg";
import cocoImg from "../../assets/images/coco_char.png";
import heroBg from "../../assets/images/coco3.png";
import BioMass from "../../assets/images/biomass.png";

const About = () => {
  return (
    <div className="about-page">

      {/* HERO SECTION WITH FIXED BACKGROUND */}
      <section
        className="about-hero"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="hero-overlay">
           
          <div className="hero-content">
          <h1>About us</h1>
            <h1>
  
              Sustainable <span>Energy</span> from Coconut
            </h1>
            <p>
              We transform coconut waste into premium bio products like
              coconut charcoal and activated charcoal that power industries
              while protecting nature.
            </p>
          </div>
        </div>
      </section>

      {/* MISSION SECTION */}
      {/* <section className="about-mission">
        <div className="mission-image">
          <img src={missionImg} alt="Mission" />
        </div>

        <div className="mission-content">
          <h2>Our Mission</h2>
          <p>
            Our mission is to provide eco-friendly and renewable energy
            alternatives through coconut-based products. We focus on
            sustainability, innovation, and environmental responsibility.
          </p>
          <p>
            By converting agricultural waste into high-value charcoal,
            we support industries while reducing carbon emissions.
          </p>
        </div>
      </section> */}

      {/* PRODUCTS SECTION */}
      <section className="about-products">
        <h2>Our Products</h2>

        <div className="product-cards">

          <div className="product-card">
            <img src={cocoImg} alt="Coconut Charcoal" />
            <h3>Coconut Charcoal</h3>
            <p>
              High carbon content, smokeless burning, and long-lasting
              performance. Ideal for BBQ, heating, and industrial usage.
            </p>
          </div>

          <div className="product-card">
            <img src={charcoalImg} alt="Activated Charcoal" />
            <h3>Activated Carbon</h3>
            <p>
              Highly porous material used in water purification, air
              filtration, gold recovery, and medical applications.
            </p>
          </div>

        </div>
      </section>








{/* BIOMASS VISION SECTION */}
<section
  className="biomass-vision"
  style={{ backgroundImage: `url(${BioMass})` }}
>
  <div className="vision-overlay">

    <h2 className="vision-heading">Our Biomass Vision</h2>

    <div className="vision-cards">

      <div className="overlay-card">
        <h3>High Calorific Output</h3>
        <p>
          Engineered for stable combustion and maximum industrial efficiency.
        </p>
      </div>

      <div className="overlay-card">
        <h3>Low Ash Residue</h3>
        <p>
          Clean burning pellets with minimal environmental impact.
        </p>
      </div>

      <div className="overlay-card">
        <h3>Industrial Grade Quality</h3>
        <p>
          Manufactured under strict quality control standards.
        </p>
      </div>

    </div>

  </div>
</section>
















<section className="about-mission">
        <div className="mission-image">
          <img src={missionImg} alt="Mission" />
        </div>

        <div className="mission-content">
          <h1>Our Mission</h1>
          <p>
            Our mission is to provide eco-friendly and renewable energy
            alternatives through coconut-based products. We focus on
            sustainability, innovation, and environmental responsibility.
          </p>
          <p>
            By converting agricultural waste into high-value charcoal,
            we support industries while reducing carbon emissions.
          </p>
        </div>
      </section>











    </div>
  );
};

export default About;
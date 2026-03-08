// import React from "react";
// import { Link } from "react-router-dom";
// import "./navbar.css";

// const Navbar = () => {
//   return (
//     <nav className="navbar navbar-expand-lg custom-navbar fixed-top">
//       <div className="container">
        
//         {/* Logo */}
//         <Link className="navbar-brand text-white fw-bold" to="/">
//           🌱 GreenEnergy
//         </Link>

//         {/* Mobile Toggle Button */}
//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#navbarNav"
//           aria-controls="navbarNav"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>

//         {/* Navbar Links */}
//         <div className="collapse navbar-collapse" id="navbarNav">
//           <ul className="navbar-nav ms-auto align-items-center">
//             <li className="nav-item">
//               <Link className="nav-link" to="/">Home</Link>
//             </li>

//             <li className="nav-item">
//               <Link className="nav-link" to="/about">About</Link>
//             </li>

//             <li className="nav-item">
//               <Link className="nav-link" to="/services">Services</Link>
//             </li>

//             <li className="nav-item">
//               <Link className="nav-link" to="/contact">Contact</Link>
//             </li>

//             <li className="nav-item ms-lg-3">
//               <Link to="/get-started" className="btn btn-eco">
//                 Get Started
//               </Link>
//             </li>
//           </ul>
//         </div>

//       </div>
//     </nav>
//   );
// };

// export default Navbar;








// import React from "react";
// import { Link } from "react-router-dom";
// import "./navbar.css";
// import logo from "../../assets/images/logo_1.png";

// const Navbar = () => {
//   return (
//     <>
//       <nav className="navbar navbar-expand-lg custom-navbar ">
//         <div className="container">

//           {/* Logo */}
//           {/* <Link className="navbar-brand fw-bold text-white" to="/">
//             🌱 GreenEnergy
//           </Link> */}
//           <Link className="navbar-brand d-flex align-items-center" to="/">
//   <img src={logo} alt="Logo" className="navbar-logo" />
// </Link>

//           {/* Hamburger (Mobile Only) */}
//           <button
//             className="navbar-toggler d-lg-none"
//             type="button"
//             data-bs-toggle="offcanvas"
//             data-bs-target="#mobileMenu"
//           >
//             <span className="navbar-toggler-icon"></span>
//           </button>

//           {/* Desktop Menu */}
//           <div className="collapse navbar-collapse d-none d-lg-flex">

//             {/* Center Menu */}
//             <ul className="navbar-nav mx-auto align-items-center">
//               <li className="nav-item">
//                 <Link className="nav-link" to="/">Home</Link>
//               </li>
//               <li className="nav-item">
//                 <Link className="nav-link" to="/about">About</Link>
//               </li>
//               <li className="nav-item">
//                 <Link className="nav-link" to="/services">Services</Link>
//               </li>
//               <li className="nav-item">
//                 <Link className="nav-link" to="/contact">Blogs</Link>
//               </li>



//               <li className="nav-item">
//                 <Link className="nav-link" to="/contact">Contact</Link>
//               </li>
//               <li className="nav-item">
//                 <Link className="nav-link" to="/contact">Contact</Link>
//               </li>



//             </ul>

//             {/* Right Button */}
//             {/* <Link to="/get-started" className="btn btn-eco">
//               Get Started
//             </Link> */}

//           </div>
//         </div>
//       </nav>

//       {/* LEFT SIDE OFFCANVAS (Mobile) */}
//       <div
//         className="offcanvas offcanvas-start"
//         tabIndex="-1"
//         id="mobileMenu"
//       >
//         <div className="offcanvas-header">
//           <h5 className="offcanvas-title fw-bold text-success">
//             🌱 GreenEnergy
//           </h5>
//           <button
//             type="button"
//             className="btn-close"
//             data-bs-dismiss="offcanvas"
//           ></button>
//         </div>

//         <div className="offcanvas-body">
//           <ul className="navbar-nav">
//             <li className="nav-item">
//               <Link className="nav-link" to="/">Home</Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/about">About</Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/services">Services</Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/contact">Contact</Link>
//             </li>


            
//               <li className="nav-item">
//                 <Link className="nav-link" to="/contact">Contact</Link>
//               </li>
//               <li className="nav-item">
//                 <Link className="nav-link" to="/contact">Contact</Link>
//               </li>


              
//             {/* <li className="nav-item mt-3">
//               <Link to="/get-started" className="btn btn-eco w-100">
//                 Get Started
//               </Link>
//             </li> */}
//           </ul>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Navbar;







// import React, { useState, useEffect } from "react";
// import { Link, useLocation } from "react-router-dom";
// import "./navbar.css";
// import logo from "../../assets/images/l1.png";

// const Navbar = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [servicesOpen, setServicesOpen] = useState(false);
//   const location = useLocation();

//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//     setMenuOpen(false);
//     setServicesOpen(false);
//   }, [location]);

//   return (
//     <>
//       <nav className="custom-navbar">
//         <div className="nav-container">

//           {/* Logo */}
//           <Link to="/" className="logo">
//             <img src={logo} alt="Logo" className="navbar-logo w-100" />
//           </Link>

//           {/* Desktop Menu */}
//           <ul className="nav-links desktop">
//             <li><Link to="/">Home</Link></li>
//             <li><Link to="/about">About</Link></li>

//             {/* Products Dropdown */}
//             <li className="dropdown">
//               <div className="dropdown-title">
//                 Our Products ▾
//               </div>

//               <ul className="dropdown-menu">
//                 <li><Link to="/briquettes">Biomass Briquettes</Link></li>
//                 <li><Link to="/pellet">Biomass Pellet</Link></li>
//                 <li><Link to="/drycocoshell">Dry Coconut Shell</Link></li>
//                 <li><Link to="/charcoal">Coconut Charcoal</Link></li>
//                 <li><Link to="/activated-charcoal">Activated Charcoal</Link></li>
//               </ul>
//             </li>

//             <li><Link to="/blogs">Blogs</Link></li>
//             <li><Link to="/contact">Contact</Link></li>
//           </ul>

//           {/* Hamburger */}
//           <div
//             className="hamburger"
//             onClick={() => setMenuOpen(!menuOpen)}
//           >
//             <span></span>
//             <span></span>
//             <span></span>
//           </div>
//         </div>
//       </nav>

//       {/* Overlay */}
//       {menuOpen && <div className="overlay" onClick={() => setMenuOpen(false)}></div>}

//       {/* Mobile Menu */}
//       <div className={`mobile-menu ${menuOpen ? "show" : ""}`}>
//         <ul>
//           <li><Link to="/">Home</Link></li>
//           <li><Link to="/about">About</Link></li>

//           <li>
//             <div
//               className="mobile-dropdown-title"
//               onClick={() => setServicesOpen(!servicesOpen)}
//             >
//               Our Products ▾
//             </div>

//             {servicesOpen && (
//               <ul className="mobile-submenu">
//                 <li><Link to="/briquettes">Biomass Briquettes</Link></li>
//                 <li><Link to="/pellet">Biomass Pellet</Link></li>
//                 <li><Link to="/drycocoshell">Dry Coconut Shell</Link></li>
//                 <li><Link to="/charcoal">Coconut Charcoal</Link></li>
//                 <li><Link to="/activated-charcoal">Activated Charcoal</Link></li>
//               </ul>
//             )}
//           </li>

//           <li><Link to="/blogs">Blogs</Link></li>
//           <li><Link to="/contact">Contact</Link></li>
//         </ul>
//       </div>
//     </>
//   );
// };

// export default Navbar;






















import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import "./navbar.css";
import logo from "../../assets/images/logo12.png";
// import logo from "../../assets/images/l1.png";

const Navbar = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const DOMAIN_NAME = import.meta.env.VITE_DOMAIN_NAME;

  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const location = useLocation();

  /* ===============================
     FETCH CATEGORIES FROM BACKEND
  =============================== */
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/categories`,
        { params: { domainName: DOMAIN_NAME } }
      );

      let categoryList = [];

      // Handle all possible backend formats
      if (Array.isArray(response.data)) {
        categoryList = response.data;
      } else if (Array.isArray(response.data?.data)) {
        categoryList = response.data.data;
      } else if (Array.isArray(response.data?.categories)) {
        categoryList = response.data.categories;
      }

      setCategories(categoryList);

    } catch (error) {
      console.error("Category fetch error:", error);
    }
  };

  /* ===============================
     RESET MENU ON ROUTE CHANGE
  =============================== */
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMenuOpen(false);
    setServicesOpen(false);
  }, [location]);

  /* ===============================
     SLUG GENERATOR
  =============================== */
  const generateSlug = (name) => {
    return name?.toLowerCase().replace(/\s+/g, "-");
  };

  return (
    <>
      <nav className="custom-navbar">
        <div className="nav-container">

          {/* Logo */}
          <Link to="/" className="logo">
            <img src={logo} alt="Logo" className="navbar-logo w-100" />
          </Link>

          {/* Desktop Menu */}
          <ul className="nav-links desktop">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>

            {/* Dynamic Products Dropdown */}
            <li className="dropdown">
              <div className="dropdown-title">
                Our Products ▾
              </div>

              <ul className="dropdown-menu">
                {categories.length > 0 ? (
                  categories.map((cat) => (
                    <li key={cat._id}>
                      <Link to={`/product/${generateSlug(cat.name)}`}>
                        {cat.name}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li className="no-category">No Categories</li>
                )}
              </ul>
            </li>

            <li><Link to="/blogs">Blogs</Link></li>
            <li><Link to="/certificates">Certificates</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>

          {/* Hamburger */}
          <div
            className="hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>

      {/* Overlay */}
      {menuOpen && (
        <div className="overlay" onClick={() => setMenuOpen(false)}></div>
      )}

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? "show" : ""}`}>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>

          <li>
            <div
              className="mobile-dropdown-title"
              onClick={() => setServicesOpen(!servicesOpen)}
            >
              Our Products ▾
            </div>

            {servicesOpen && (
              <ul className="mobile-submenu">
                {categories.length > 0 ? (
                  categories.map((cat) => (
                    <li key={cat._id}>
                      <Link
                        to={`/product/${generateSlug(cat.name)}`}
                        onClick={() => setMenuOpen(false)}
                      >
                        {cat.name}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li className="no-category">No Categories</li>
                )}
              </ul>
            )}
          </li>

          <li><Link to="/blogs">Blogs</Link></li>
          <li><Link to="/certificates">Certificates</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
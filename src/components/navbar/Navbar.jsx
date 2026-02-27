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








import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg custom-navbar ">
        <div className="container">

          {/* Logo */}
          <Link className="navbar-brand fw-bold text-white" to="/">
            🌱 GreenEnergy
          </Link>

          {/* Hamburger (Mobile Only) */}
          <button
            className="navbar-toggler d-lg-none"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#mobileMenu"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Desktop Menu */}
          <div className="collapse navbar-collapse d-none d-lg-flex">

            {/* Center Menu */}
            <ul className="navbar-nav mx-auto align-items-center">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">About</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/services">Services</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">Contact</Link>
              </li>
            </ul>

            {/* Right Button */}
            <Link to="/get-started" className="btn btn-eco">
              Get Started
            </Link>

          </div>
        </div>
      </nav>

      {/* LEFT SIDE OFFCANVAS (Mobile) */}
      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="mobileMenu"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title fw-bold text-success">
            🌱 GreenEnergy
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
          ></button>
        </div>

        <div className="offcanvas-body">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/services">Services</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contact</Link>
            </li>
            <li className="nav-item mt-3">
              <Link to="/get-started" className="btn btn-eco w-100">
                Get Started
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
// import React, { useState } from "react";
// import axios from "axios";
// import "./Contact.css";
// import {
//   FaPhoneAlt,
//   FaEnvelope,
//   FaMapMarkerAlt,
//   FaFileInvoice,
// } from "react-icons/fa";

// const Contact = () => {
//   const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
//   const DOMAIN_NAME = import.meta.env.VITE_DOMAIN_NAME;

//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     email: "",
//     country: "",   // ✅ Added country
//     message: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [responseMsg, setResponseMsg] = useState("");

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setResponseMsg("");

//     try {
//       const response = await axios.post(`${API_BASE_URL}/api/contact`, {
//         name: formData.name,
//         phone: formData.phone,
//         email: formData.email,
//         country: formData.country, // ✅ Sending country to backend
//         message: formData.message,
//         domainName: DOMAIN_NAME,
//       });

//       if (response.status === 200 || response.status === 201) {
//         setResponseMsg("✅ Message sent successfully!");
//         setFormData({
//           name: "",
//           phone: "",
//           email: "",
//           country: "", // ✅ Reset country
//           message: "",
//         });
//       }
//     } catch (error) {
//       console.log("STATUS:", error.response?.status);
//       console.log("DATA:", error.response?.data);

//       setResponseMsg(
//         error.response?.data?.message
//           ? `❌ ${error.response.data.message}`
//           : "❌ Server error. Please try later."
//       );
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="contact-page">
//       <section className="contact-section">
//         <div className="contact-container">
//           <div className="contact-left">
//             <h2>Om Green Energy</h2>
//             <p className="tagline">
//               Sustainable Energy for a Greener Tomorrow
//             </p>
//           </div>

//           <div className="contact-right">
//             <h2>Contact Us</h2>

//             <form onSubmit={handleSubmit}>
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Full Name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 required
//               />

//               <div className="row">
//                 <input
//                   type="text"
//                   name="phone"
//                   placeholder="Phone Number"
//                   value={formData.phone}
//                   onChange={handleChange}
//                   required
//                 />
//                 <input
//                   type="email"
//                   name="email"
//                   placeholder="Email Address"
//                   value={formData.email}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               {/* ✅ Country Field Added */}
//               <input
//                 type="text"
//                 name="country"
//                 placeholder="Country"
//                 value={formData.country}
//                 onChange={handleChange}
//                 required
//               />

//               <textarea
//                 rows="4"
//                 name="message"
//                 placeholder="Your Message"
//                 value={formData.message}
//                 onChange={handleChange}
//               ></textarea>

//               <button type="submit" disabled={loading}>
//                 {loading ? "Sending..." : "Send Message"}
//               </button>

//               {responseMsg && (
//                 <p className="response-msg">{responseMsg}</p>
//               )}
//             </form>
//           </div>
//         </div>
//       </section>

//       {/* INFO CARDS */}
//       <section className="info-section">
//         <div className="info-card">
//           <div className="icon-wrapper">
//             <FaPhoneAlt />
//           </div>
//           <h3>Contact Phone</h3>
//           <p>+91 9021583010</p>
//         </div>

//         <div className="info-card">
//           <div className="icon-wrapper">
//             <FaEnvelope />
//           </div>
//           <h3>Email Address</h3>
//           <p>ambarteshilpa@gmail.com</p>
//         </div>

//         <div className="info-card">
//           <div className="icon-wrapper">
//             <FaMapMarkerAlt />
//           </div>
//           <h3>Company Location</h3>
//           <p>Nagpur, Maharashtra</p>
//         </div>

//         <div className="info-card">
//           <div className="icon-wrapper">
//             <FaFileInvoice />
//           </div>
//           <h3>GST Number</h3>
//           <p>27DNQPA3770R1Z7</p>
//         </div>
//       </section>

//       {/* LOCATION */}
//       <section className="location-section">
//         <h2>Our Location</h2>
//         <p>
//           Plot No. 19, Apex Enterprise, Khadgaon Road, Front of Global Indian
//           International School, Dattawadi, Nagpur, Maharashtra – 440023
//         </p>

//         <div className="map-container">
//           <iframe
//             title="Om Green Energy Location"
//             src="https://www.google.com/maps?q=Nagpur,Maharashtra&output=embed"
//             loading="lazy"
//           ></iframe>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Contact;








import React, { useState } from "react";
import axios from "axios";
import "./Contact.css";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { FaFacebookF, FaInstagram, FaYoutube, FaWhatsapp, FaLinkedin } from "react-icons/fa";

const Contact = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const DOMAIN_NAME = import.meta.env.VITE_DOMAIN_NAME;

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    country: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseMsg("");

    try {
      const response = await axios.post(`${API_BASE_URL}/api/contact`, {
        ...formData,
        domainName: DOMAIN_NAME,
      });

      if (response.status === 200 || response.status === 201) {
        setResponseMsg("✅ Message sent successfully!");
        setFormData({
          name: "",
          phone: "",
          email: "",
          country: "",
          message: "",
        });
      }
    } catch (error) {
      setResponseMsg("❌ Server error. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="contact-page">

      {/* HERO SECTION */}
      <div className="contact-hero">
        <div className="contact-hero-bg"></div>
        <div className="contact-hero-content">
          <h1>Get in Touch</h1>
          <p>We'd love to hear from you. Reach out to us for any inquiries!</p>
        </div>
      </div>

      <h2 className="contact-title">Get in Touch</h2>

      <div className="contact-wrapper">

        {/* LEFT CARD */}
        <div className="contact-card">

          <h3>Om Green Energy</h3>

          <p>www.omgeecof.com.com</p>

          <p>
            <FaPhoneAlt /> +91 9021583010
          </p>

          <p>
            <FaEnvelope /> info@swaminamglobal.com
          </p>

          <p>
            Mon-Sat (available 24x7 on whatsapp)
          </p>

          <p>
            <FaMapMarkerAlt /> Plot no. 19, Apex Enterprise, Khadgaon Road, Dattawadi, Nagpur
          </p>

          <div className="social-icons">
            <FaFacebookF />
            <FaInstagram />
            <FaYoutube />
            <FaWhatsapp />
            <FaLinkedin />
          </div>

        </div>

        {/* RIGHT FORM */}
        <div className="contact-form">

          <h3>Send Us an Enquiry</h3>

          <form onSubmit={handleSubmit}>

            <div className="form-row">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-row">
              <input
                type="text"
                name="phone"
                placeholder="Mobile / WhatsApp Number"
                value={formData.phone}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="country"
                placeholder="Country"
                value={formData.country}
                onChange={handleChange}
                required
              />
            </div>

            <textarea
              name="message"
              placeholder="Your Message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
            ></textarea>

            <button type="submit">
              {loading ? "Sending..." : "Submit Enquiry"}
            </button>

            {responseMsg && (
              <p className="response-msg">{responseMsg}</p>
            )}

          </form>

        </div>

      </div>

      {/* MAP */}

     <div className="map-section">

  <iframe
    title="location"
    src="https://www.google.com/maps?q=Plot+no+19+Apex+Enterprise+Khadgaon+Road+Dattawadi+Nagpur&output=embed"
    loading="lazy"
  ></iframe>

</div>
    </div>
  );
};

export default Contact;
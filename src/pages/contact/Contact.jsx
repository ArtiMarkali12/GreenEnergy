import React, { useState } from "react";
import axios from "axios";
import "./Contact.css";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFileInvoice,
} from "react-icons/fa";

const Contact = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const DOMAIN_NAME = import.meta.env.VITE_DOMAIN_NAME;

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    country: "",   // ✅ Added country
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
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        country: formData.country, // ✅ Sending country to backend
        message: formData.message,
        domainName: DOMAIN_NAME,
      });

      if (response.status === 200 || response.status === 201) {
        setResponseMsg("✅ Message sent successfully!");
        setFormData({
          name: "",
          phone: "",
          email: "",
          country: "", // ✅ Reset country
          message: "",
        });
      }
    } catch (error) {
      console.log("STATUS:", error.response?.status);
      console.log("DATA:", error.response?.data);

      setResponseMsg(
        error.response?.data?.message
          ? `❌ ${error.response.data.message}`
          : "❌ Server error. Please try later."
      );
    }

    setLoading(false);
  };

  return (
    <div className="contact-page">
      <section className="contact-section">
        <div className="contact-container">
          <div className="contact-left">
            <h2>Om Green Energy</h2>
            <p className="tagline">
              Sustainable Energy for a Greener Tomorrow
            </p>
          </div>

          <div className="contact-right">
            <h2>Contact Us</h2>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <div className="row">
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* ✅ Country Field Added */}
              <input
                type="text"
                name="country"
                placeholder="Country"
                value={formData.country}
                onChange={handleChange}
                required
              />

              <textarea
                rows="4"
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
              ></textarea>

              <button type="submit" disabled={loading}>
                {loading ? "Sending..." : "Send Message"}
              </button>

              {responseMsg && (
                <p className="response-msg">{responseMsg}</p>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* INFO CARDS */}
      <section className="info-section">
        <div className="info-card">
          <div className="icon-wrapper">
            <FaPhoneAlt />
          </div>
          <h3>Contact Phone</h3>
          <p>+91 9021583010</p>
        </div>

        <div className="info-card">
          <div className="icon-wrapper">
            <FaEnvelope />
          </div>
          <h3>Email Address</h3>
          <p>ambarteshilpa@gmail.com</p>
        </div>

        <div className="info-card">
          <div className="icon-wrapper">
            <FaMapMarkerAlt />
          </div>
          <h3>Company Location</h3>
          <p>Nagpur, Maharashtra</p>
        </div>

        <div className="info-card">
          <div className="icon-wrapper">
            <FaFileInvoice />
          </div>
          <h3>GST Number</h3>
          <p>27DNQPA3770R1Z7</p>
        </div>
      </section>

      {/* LOCATION */}
      <section className="location-section">
        <h2>Our Location</h2>
        <p>
          Plot No. 19, Apex Enterprise, Khadgaon Road, Front of Global Indian
          International School, Dattawadi, Nagpur, Maharashtra – 440023
        </p>

        <div className="map-container">
          <iframe
            title="Om Green Energy Location"
            src="https://www.google.com/maps?q=Nagpur,Maharashtra&output=embed"
            loading="lazy"
          ></iframe>
        </div>
      </section>
    </div>
  );
};

export default Contact;
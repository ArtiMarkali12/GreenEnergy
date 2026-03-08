import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Certificate.css";

const Certificate = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const DOMAIN_NAME = import.meta.env.VITE_DOMAIN_NAME;

  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  /* ===============================
     SCROLL TO TOP ON MOUNT
  =============================== */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  /* ===============================
     FETCH CERTIFICATES
  =============================== */
  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        `${API_BASE_URL}/api/certificates`,
        { params: { domainName: DOMAIN_NAME } }
      );

      let certificateList = [];

      // Handle all possible backend formats
      if (Array.isArray(response.data)) {
        certificateList = response.data;
      } else if (Array.isArray(response.data?.data)) {
        certificateList = response.data.data;
      } else if (Array.isArray(response.data?.certificates)) {
        certificateList = response.data.certificates;
      }

      setCertificates(certificateList);
    } catch (error) {
      console.error("Certificate fetch error:", error);
      setError("Failed to load certificates");
    } finally {
      setLoading(false);
    }
  };

  /* ===============================
     MODAL HANDLERS
  =============================== */
  const openModal = (certificate) => {
    setSelectedCertificate(certificate);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCertificate(null);
    document.body.style.overflow = "";
  };

  /* ===============================
     ESC KEY CLOSE MODAL
  =============================== */
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") closeModal();
    };

    if (isModalOpen) {
      document.addEventListener("keydown", handleEsc);
    }

    return () => document.removeEventListener("keydown", handleEsc);
  }, [isModalOpen]);

  /* ===============================
     GET CERTIFICATE IMAGE URL
  =============================== */
  const getCertificateImageUrl = (certificate) => {
    if (!certificate) return "/default-certificate.jpg";
    
    const img = certificate.image || certificate.certificateImage;
    
    if (!img) return "/default-certificate.jpg";
    if (img.startsWith("data:image")) return img;
    if (img.startsWith("http")) return img;
    return `${API_BASE_URL}/${img.replace(/^\/+/, "")}`;
  };

  /* ===============================
     LOADING STATE
  =============================== */
  if (loading) {
    return (
      <div className="certificate-page">
        <div className="cert-loading">Loading Certificates...</div>
      </div>
    );
  }

  /* ===============================
     ERROR STATE
  =============================== */
  if (error) {
    return (
      <div className="certificate-page">
        <div className="cert-error">
          <p>{error}</p>
          <button onClick={fetchCertificates} className="cert-retry-btn">
            Retry
          </button>
        </div>
      </div>
    );
  }

  /* ===============================
     NO CERTIFICATES STATE
  =============================== */
  if (certificates.length === 0) {
    return (
      <div className="certificate-page">
        <div className="cert-no-data">
          <h3>No Certificates Found</h3>
          <p>Check back later for our certifications</p>
        </div>
      </div>
    );
  }

  /* ===============================
     MAIN RENDER
  =============================== */
  return (
    <div className="certificate-page">
      {/* HERO SECTION */}
      <div className="cert-hero">
        <h1 className="cert-title">Our Certifications</h1>
        <p className="cert-subtitle">
          Recognized for quality, sustainability, and excellence
        </p>
      </div>

      {/* CERTIFICATES GRID */}
      <div className="cert-container">
        <div className="cert-grid">
          {certificates.map((cert) => (
            <div
              key={cert._id}
              className="cert-card"
              onClick={() => openModal(cert)}
            >
              <div className="cert-image-wrapper">
                <img
                  src={getCertificateImageUrl(cert)}
                  alt={cert.name || cert.certificateName || "Certificate"}
                  onError={(e) => (e.target.src = "/default-certificate.jpg")}
                />
                <div className="cert-overlay">
                  <span className="cert-view-btn">View Certificate</span>
                </div>
              </div>

              <div className="cert-content">
                <h3 className="cert-name">
                  {cert.name || cert.certificateName || "Certificate"}
                </h3>
                {cert.issuedBy && (
                  <p className="cert-issued-by">Issued by: {cert.issuedBy}</p>
                )}
                {cert.validUntil && (
                  <p className="cert-validity">
                    Valid until: {new Date(cert.validUntil).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===============================
         MODAL
      =============================== */}
      {isModalOpen && selectedCertificate && (
        <div className="cert-modal-backdrop" onClick={closeModal}>
          <div className="cert-modal" onClick={(e) => e.stopPropagation()}>
            <button className="cert-modal-close" onClick={closeModal}>
              ×
            </button>

            <div className="cert-modal-header">
              <h2 className="cert-modal-title">
                {selectedCertificate.name || selectedCertificate.certificateName}
              </h2>
              {selectedCertificate.issuedBy && (
                <p className="cert-modal-issued-by">
                  Issued by: {selectedCertificate.issuedBy}
                </p>
              )}
            </div>

            <div className="cert-modal-image-section">
              <img
                src={getCertificateImageUrl(selectedCertificate)}
                alt={selectedCertificate.name || "Certificate"}
                onError={(e) => (e.target.src = "/default-certificate.jpg")}
              />
            </div>

            <div className="cert-modal-details">
              {selectedCertificate.description && (
                <div className="cert-modal-description">
                  <h4>Description</h4>
                  <p>{selectedCertificate.description}</p>
                </div>
              )}

              <div className="cert-modal-info-grid">
                {selectedCertificate.validUntil && (
                  <div className="cert-info-item">
                    <strong>Valid Until:</strong>
                    <span>
                      {new Date(selectedCertificate.validUntil).toLocaleDateString()}
                    </span>
                  </div>
                )}
                {selectedCertificate.certificateNumber && (
                  <div className="cert-info-item">
                    <strong>Certificate No:</strong>
                    <span>{selectedCertificate.certificateNumber}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="cert-modal-actions">
              <a
                href={getCertificateImageUrl(selectedCertificate)}
                target="_blank"
                rel="noopener noreferrer"
                className="cert-download-btn"
              >
                Download Certificate
              </a>
              <button className="cert-close-btn" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Certificate;

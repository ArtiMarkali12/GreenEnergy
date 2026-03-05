import axios from "axios";
import React, { useEffect, useState } from "react";
import "./ProductCard.css";
import { NavLink } from "react-router-dom";

function ProductCard({ product }) {
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  /* ================= LOAD IMAGES ================= */
  useEffect(() => {
    if (!product?._id) return;

    setLoading(true);
    setImages([]);
    setCurrentIndex(0);

    const loadImages = async () => {
      try {
        const res = await axios.get(`${API_BASE}/product-images`, {
          params: { productId: product._id },
        });

        setImages(res.data?.data || []);
      } catch (error) {
        setImages([]);
      } finally {
        setLoading(false);
      }
    };

    loadImages();
  }, [product?._id, API_BASE]);

  /* ================= ESC CLOSE ================= */
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") setIsModalOpen(false);
    };

    if (isModalOpen) {
      document.addEventListener("keydown", handleKey);
    }

    return () => document.removeEventListener("keydown", handleKey);
  }, [isModalOpen]);

  /* ================= BODY SCROLL LOCK ================= */
  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  /* ================= ATTRIBUTES ================= */
  const getAttr = (key) =>
    product?.attributes?.find(
      (a) => a.attributeKey?.toLowerCase() === key.toLowerCase(),
    )?.values?.[0] || "";

  const title = getAttr("title") || product?.name || "Product";
  const description = getAttr("description") || product?.description || "";
  console.log(description);
  const capacity =
    getAttr("capacity") || product?.capacity || "16 KVA to 20 MVA";
  const Usage = getAttr("Usage");
  const Benefits = getAttr("Benefits");
  const Material = getAttr("Material");

  const NoImage = () => (
    <div className="pc-no-img d-flex align-items-center justify-content-center">
      <p className="text-muted mb-0">No Image</p>
    </div>
  );

  /* ================= JSX ================= */
  return (
    <>
      {/* ================= CARD ================= */}
      <div
        className="pc-card card border-0 h-100"
        onClick={() => {
          setCurrentIndex(0);
          setIsModalOpen(true);
        }}
      >
        <div className="pc-img-wrap">
          {loading ? (
            <div className="pc-skeleton" />
          ) : images.length > 0 ? (
            <img src={images[0]?.image} alt={title} className="pc-img" />
          ) : (
            <NoImage />
          )}
        </div>

        <div className="card-body pc-body">
          <p className="pc-category">{product?.categoryName || "General"}</p>

          <h5 className="pc-title">{title}</h5>
          {capacity && (
            <h5 className="pc-des">
              Capacity : <p className="pc-capacity">{capacity}</p>
            </h5>
          )}
          {description && (
            <div>
              <h6 className="pc-des mt-2">Description :</h6>
              <p className="pc-desc mt-2">
                {description.length > 300
                  ? description.slice(0, 300) + "..."
                  : description}
              </p>
            </div>
          )}
        </div>

        <div className="card-footer pc-footer bg-transparent border-0 d-flex justify-content-between align-items-center">
          <span className="pc-price-na">Price on request</span>

          <div className="d-flex gap-2">
            <button
              className="pc-btn-outline btn"
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(0);
                setIsModalOpen(true);
              }}
            >
              View
            </button>

            <NavLink
              to="/contact"
              className="pc-btn btn"
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(0);
                setIsModalOpen(true);
              }}
            >
              Enquire
            </NavLink>
          </div>
        </div>
      </div>

      {/* ================= MODAL ================= */}
      {isModalOpen && (
        <div
          className="pc-modal-backdrop"
          onClick={() => setIsModalOpen(false)}
        >
          <div className="pc-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="pc-modal-close"
              onClick={() => setIsModalOpen(false)}
            >
              ×
            </button>

            {/* ===== IMAGE TOP ===== */}
            <div className="pc-modal-img-wrapper">
              {images.length > 0 ? (
                <>
                  <img
                    src={images[currentIndex]?.image}
                    alt={title}
                    className="pc-modal-img"
                  />

                  {images.length > 1 && (
                    <>
                      <button
                        className="pc-slider-btn left"
                        onClick={() =>
                          setCurrentIndex((prev) =>
                            prev === 0 ? images.length - 1 : prev - 1,
                          )
                        }
                      >
                        ‹
                      </button>

                      <button
                        className="pc-slider-btn right"
                        onClick={() =>
                          setCurrentIndex((prev) =>
                            prev === images.length - 1 ? 0 : prev + 1,
                          )
                        }
                      >
                        ›
                      </button>
                    </>
                  )}
                </>
              ) : (
                <NoImage />
              )}
            </div>

            {/* ===== DETAILS ===== */}
            <div className="pc-modal-body">
              <p className="pc-category">
                {product?.CategoryName || "General"}
              </p>

              <h2 className="pc-modal-title">{title}</h2>
              <h5 className="pc-capacity mt-2 text-center">{capacity}</h5>
              {description && (
                <p className="pc-modal-desc mt-2">{description}</p>
              )}

              {(Usage || Benefits || Material) && (
                <div className="pc-modal-attrs">
                  {Usage && (
                    <p>
                      <strong>Usage:</strong> {Usage}
                    </p>
                  )}
                  {Benefits && (
                    <p>
                      <strong>Benefits:</strong> {Benefits}
                    </p>
                  )}
                  {Material && (
                    <p>
                      <strong>Material:</strong> {Material}
                    </p>
                  )}
                </div>
              )}

              <div className="pc-modal-actions">
                <NavLink to="/contact" className="pc-btn mx-3  btn">
                  Enquire Now
                </NavLink>

                <button
                  className="btn btn-outline-secondary"
                  onClick={() => setIsModalOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductCard;
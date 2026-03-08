import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./BiomassBriquettes.css";

const API_BASE = import.meta.env.VITE_API_BASE_URL;
const DOMAIN_NAME = import.meta.env.VITE_DOMAIN_NAME;

function formatKey(key) {
  return key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
}

function normalizeAttributes(attributes = []) {
  const map = {};

  attributes.forEach((attr) => {
    if (!map[attr.attributeKey]) map[attr.attributeKey] = [];
    if (Array.isArray(attr.values)) map[attr.attributeKey].push(...attr.values);
  });

  return Object.entries(map).map(([key, values]) => ({
    attributeKey: key,
    values: [...new Set(values)],
  }));
}

const BiomassBriquettes = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [images, setImages] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const categoryName = "Biomass Briquettes";

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      setLoading(true);

      const catRes = await axios.get(`${API_BASE}/api/categories`, {
        params: { domainName: DOMAIN_NAME },
      });

      const categories = catRes.data?.data || [];

      const matchedCategory = categories.find(
        (c) => c.name.toLowerCase() === categoryName.toLowerCase()
      );

      if (!matchedCategory) {
        setLoading(false);
        return;
      }

      const prodRes = await axios.get(`${API_BASE}/api/products`, {
        params: {
          domainName: DOMAIN_NAME,
          categoryId: matchedCategory._id,
        },
      });

      const products = prodRes.data?.data || [];

      if (!products.length) {
        setLoading(false);
        return;
      }

      const selectedProduct = products[0];
      setProduct(selectedProduct);

      fetchImages(selectedProduct._id);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const fetchImages = async (productId) => {
    try {
      const res = await axios.get(`${API_BASE}/api/product-images`, {
        params: { productId },
      });

      setImages(res.data?.data || []);
      setActiveIndex(0);
    } catch {
      setImages([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="briquettes-center">Loading...</div>;

  if (!product)
    return <div className="briquettes-center">Product Not Found</div>;

  const normalizedAttributes = normalizeAttributes(product.attributes);

  const getAttr = (key) =>
    normalizedAttributes.find((a) => a.attributeKey === key)?.values || [];

  const productName =
    getAttr("product_name")[0] ||
    getAttr("title")[0] ||
    product.name ||
    "Product";

  const description = getAttr("description")[0];

  return (
    <div className="briquettes-page-wrapper">
      {/* HERO SECTION WITH FIXED BACKGROUND */}
      <div className="briquettes-hero-section zoom-animate">
        <div className="briquettes-hero-overlay">
          <div className="briquettes-hero-content briquettes-zoom-animate">
            <h1>{productName}</h1>
            <p>Eco-Friendly Renewable Energy Solution</p>
          </div>
        </div>
      </div>

      {/* PRODUCT CONTENT */}
      <div className="briquettes-container">
        <div className="briquettes-card">
        {/* LEFT CONTENT */}

        <div className="briquettes-left">
          <h2 className="briquettes-title">{productName}</h2>

          {description && (
            <p className="briquettes-desc">{description}</p>
          )}

          <table className="briquettes-table">
            <tbody>
              {normalizedAttributes
                .filter(
                  (a) =>
                    !["product_name", "title", "description"].includes(
                      a.attributeKey
                    )
                )
                .map((attr) => (
                  <tr key={attr.attributeKey}>
                    <td className="briquettes-key">
                      {formatKey(attr.attributeKey)}
                    </td>

                    <td className="briquettes-value">
                      {attr.values.join(", ")}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          <button className="briquettes-btn" onClick={() => navigate("/contact")}>
            Enquiry
          </button>
        </div>

        {/* RIGHT IMAGES */}

        <div className="briquettes-right">
          <div className="briquettes-main-img">
            {images.length > 0 ? (
              <img
                src={images[activeIndex]?.image}
                alt={productName}
              />
            ) : (
              <span>No Image</span>
            )}
          </div>

          <div className="briquettes-thumbs">
            {images.map((img, index) => (
              <img
                key={index}
                src={img.image}
                alt=""
                onClick={() => setActiveIndex(index)}
                className={
                  activeIndex === index
                    ? "briquettes-thumb-active"
                    : ""
                }
              />
            ))}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default BiomassBriquettes;

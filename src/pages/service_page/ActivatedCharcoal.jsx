import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ActivatedCharcoal.css";

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

const ActivatedCharcoal = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [images, setImages] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const categoryName = "Activated Charcoal";

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

      // Normalize spaces: replace multiple spaces with single space
      const matchedCategory = categories.find(
        (c) => 
          c.name.toLowerCase().replace(/\s+/g, ' ').trim() === 
          categoryName.toLowerCase().replace(/\s+/g, ' ').trim()
      );

      if (!matchedCategory) {
        console.log("Looking for:", categoryName);
        console.log("Available categories:", categories.map(c => ({ 
          name: c.name, 
          normalized: c.name.toLowerCase().replace(/\s+/g, ' ').trim() 
        })));
        console.error("Category not found:", categoryName);
        setLoading(false);
        return;
      }

      console.log("Matched Category:", matchedCategory);

      // Try fetching by categoryId first
      let products = [];
      try {
        const prodRes = await axios.get(`${API_BASE}/api/products`, {
          params: {
            domainName: DOMAIN_NAME,
            categoryId: matchedCategory._id,
          },
        });
        products = prodRes.data?.data || [];
        console.log("Products by categoryId:", products);
      } catch (prodErr) {
        console.warn("Failed to fetch by categoryId, trying fallback...");
      }

      // Fallback: fetch all products and filter by name
      if (products.length === 0) {
        const allProdRes = await axios.get(`${API_BASE}/api/products`, {
          params: { domainName: DOMAIN_NAME },
        });
        const allProducts = allProdRes.data?.data || [];
        console.log("All Products:", allProducts);

        products = allProducts.filter((p) => {
          const productName = p.name?.toLowerCase().trim() || "";
          return productName.includes("activated") && productName.includes("charcoal");
        });
        console.log("Filtered products by name:", products);
      }

      if (!products.length) {
        console.warn("No products found for category:", categoryName);
        setLoading(false);
        return;
      }

      const selectedProduct = products[0];
      setProduct(selectedProduct);

      fetchImages(selectedProduct._id);
    } catch (err) {
      console.error("Fetch error:", err);
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

  if (loading) return <div className="activated-center">Loading...</div>;

  if (!product)
    return <div className="activated-center">Product Not Found</div>;

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
    <div className="activated-page-wrapper">
      {/* HERO SECTION WITH FIXED BACKGROUND */}
      <div className="activated-hero-section zoom-animate">
        <div className="activated-hero-overlay">
          <div className="activated-hero-content activated-zoom-animate">
            <h1>{productName}</h1>
            <p>Premium Quality Activated Charcoal</p>
          </div>
        </div>
      </div>

      {/* PRODUCT CONTENT */}
      <div className="activated-container">
        <div className="activated-card">
        {/* LEFT CONTENT */}

        <div className="activated-left">
          {/* <div className="activated-breadcrumb">
            <span>Home</span>
            <span>/</span>
            <span>Products</span>
            <span>/</span>
            <span>{productName}</span>
          </div> */}

          <h2 className="activated-title mx-4">{productName}</h2>

          {description && (
            <p className="activated-desc">{description}</p>
          )}

          <table className="activated-table">
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
                    <td className="activated-key">
                      {formatKey(attr.attributeKey)}
                    </td>

                    <td className="activated-value">
                      {attr.values.join(", ")}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          <button className="activated-btn" onClick={() => navigate("/contact")}>
            Enquiry
          </button>
        </div>

        {/* RIGHT IMAGES */}

        <div className="activated-right">
          <div className="activated-main-img">
            {images.length > 0 ? (
              <img
                src={images[activeIndex]?.image}
                alt={productName}
              />
            ) : (
              <span>No Image</span>
            )}
          </div>

          <div className="activated-thumbs">
            {images.map((img, index) => (
              <img
                key={index}
                src={img.image}
                alt=""
                onClick={() => setActiveIndex(index)}
                className={
                  activeIndex === index
                    ? "activated-thumb-active"
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

export default ActivatedCharcoal;

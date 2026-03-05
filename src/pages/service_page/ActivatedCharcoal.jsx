import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./ActivatedCharcoal.css";

const ActivatedCharcoal = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const DOMAIN_NAME = import.meta.env.VITE_DOMAIN_NAME;

  const { categorySlug } = useParams();

  const [product, setProduct] = useState(null);
  const [productImages, setProductImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryName, setCategoryName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProductByCategory();
  }, [categorySlug]);

  /* ===============================
     FETCH PRODUCT USING CATEGORY
  =============================== */

  const fetchProductByCategory = async () => {
    try {
      const catRes = await axios.get(
        `${API_BASE_URL}/api/categories`,
        { params: { domainName: DOMAIN_NAME } }
      );

      const categories =
        catRes.data?.data ||
        catRes.data?.categories ||
        catRes.data ||
        [];

      console.log("All Categories:", categories);
      console.log("Looking for slug:", categorySlug);

      const matchedCategory = categories.find((cat) => {
        const slug = cat.name.toLowerCase().replace(/\s+/g, "-");
        console.log(`Category: ${cat.name} -> Slug: ${slug}`);
        return slug === categorySlug;
      });

      if (!matchedCategory) {
        console.error("No category matched for slug:", categorySlug);
        const fallbackName = categorySlug.replace(/-/g, " ");
        setCategoryName(fallbackName);
        setError(`Category "${fallbackName}" not found in backend. Available categories: ${categories.map(c => c.name).join(", ")}`);
        console.log("Available categories:", categories.map(c => ({ name: c.name, slug: c.name.toLowerCase().replace(/\s+/g, "-") })));
        setLoading(false);
        return;
      }

      /* HERO TITLE SET */
      setCategoryName(matchedCategory.name);
      console.log("Matched Category:", matchedCategory);

      // First try: Fetch products by categoryId
      let products = [];
      
      try {
        const productRes = await axios.get(
          `${API_BASE_URL}/api/products`,
          {
            params: {
              domainName: DOMAIN_NAME,
              categoryId: matchedCategory._id
            }
          }
        );
        products = productRes.data?.data || [];
      } catch (productError) {
        console.warn("Failed to fetch products by categoryId, trying fallback...");
      }

      // Fallback: If no products found by categoryId, fetch all and filter by name
      if (products.length === 0) {
        console.log("No products found by categoryId, trying name-based search...");
        const allProductsRes = await axios.get(
          `${API_BASE_URL}/api/products`,
          { params: { domainName: DOMAIN_NAME } }
        );
        const allProducts = allProductsRes.data?.data || [];
        
        // Find products that match the category name
        products = allProducts.filter((p) => {
          const productName = p.name?.toLowerCase() || "";
          const categoryName = matchedCategory.name.toLowerCase();
          return productName.includes(categoryName) || categoryName.includes(productName);
        });
      }

      console.log("Products for category:", products);

      if (products.length === 0) {
        console.warn("No products found for category:", matchedCategory.name);
        setError(`No products found for "${matchedCategory.name}". Check backend product-category linkage.`);
        setLoading(false);
        return;
      }

      const selectedProduct = products[0];

      setProduct(selectedProduct);

      fetchProductImages(selectedProduct._id);

    } catch (error) {
      console.error("Product fetch error:", error);
      setLoading(false);
    }
  };

  /* ===============================
     FETCH PRODUCT IMAGES
  =============================== */

  const fetchProductImages = async (productId) => {
    try {
      const res = await axios.get(
        `${API_BASE_URL}/api/product-images`,
        { params: { productId } }
      );

      if (res.data.success) {
        setProductImages(res.data.data || []);
      }

    } catch (error) {
      console.error("Image fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  /* ===============================
     IMAGE URL
  =============================== */

  const getImageUrl = () => {
    if (!productImages.length) return "/default-product.jpg";

    const img = productImages[0]?.image;

    if (!img) return "/default-product.jpg";

    if (img.startsWith("data:image")) return img;

    if (img.startsWith("http")) return img;

    return `${API_BASE_URL}/${img.replace(/^\/+/, "")}`;
  };

  if (loading) {
    return <div className="product-loading">Loading Product...</div>;
  }

  if (error) {
    return (
      <div className="product-loading">
        <h2>⚠️ {error}</h2>
        <p style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
          Check browser console (F12) for detailed logs
        </p>
      </div>
    );
  }

  if (!product) {
    return <div className="product-loading">Product Not Found</div>;
  }

  return (
    <div className="product-page">
      {/* HERO SECTION */}
      <div className="hero-section">
        <h1 className="hero-title">
          {categoryName}
        </h1>
      </div>

      {/* PRODUCT CARD */}
      <div className="product-container">
        <div className="product-image-section">
          <img
            src={getImageUrl()}
            alt={product.name}
            onError={(e) => (e.target.src = "/default-product.jpg")}
          />
        </div>

        <div className="product-details-section">
          <div className="attributes-grid">
            {product.attributes?.map((attr) => (
              <div className="attribute-card" key={attr.attributeId}>
                <h4>{attr.attributeKey}</h4>
                <p>
                  {renderAttributeValue(attr.values)}
                  {attr.unit ? ` ${attr.unit}` : ""}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const renderAttributeValue = (value) => {
  if (!value) return "-";
  if (typeof value === "string" || typeof value === "number") return value;
  if (Array.isArray(value)) return value.join(", ");
  if (typeof value === "object") return JSON.stringify(value);
  return "-";
};

export default ActivatedCharcoal;

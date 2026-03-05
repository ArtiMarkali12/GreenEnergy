import React, { useEffect, useState } from "react";
import axios from "axios";
import "./cocoCharcoal.css";

const CocoCharcoal = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const DOMAIN_NAME = import.meta.env.VITE_DOMAIN_NAME;

  const [product, setProduct] = useState(null);
  const [productImages, setProductImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryName, setCategoryName] = useState("Coconut Shell Charcoal");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProductByCategory();
  }, []);

  const fetchProductByCategory = async () => {
    try {
      const catRes = await axios.get(`${API_BASE_URL}/api/categories`, {
        params: { domainName: DOMAIN_NAME },
      });

      const categories =
        catRes.data?.data || catRes.data?.categories || catRes.data || [];

      console.log("All Categories:", categories);

      // Find the category by name (case-insensitive)
      const matchedCategory = categories.find((cat) =>
        cat.name.toLowerCase() === categoryName.toLowerCase()
      );

      if (!matchedCategory) {
        console.error("Category not found:", categoryName);
        setError(`Category "${categoryName}" not found in backend. Available categories: ${categories.map(c => c.name).join(", ")}`);
        console.log("Available categories:", categories.map(c => ({ name: c.name, slug: c.name.toLowerCase().replace(/\s+/g, "-") })));
        setLoading(false);
        return;
      }

      console.log("Matched Category:", matchedCategory);

      // First try: Fetch products by categoryId
      let products = [];

      try {
        const productRes = await axios.get(`${API_BASE_URL}/api/products`, {
          params: { domainName: DOMAIN_NAME, categoryId: matchedCategory._id },
        });
        products = productRes.data?.data || [];
      } catch (productError) {
        console.warn("Failed to fetch products by categoryId, trying fallback...");
      }

      // Fallback: If no products found by categoryId, fetch all and filter by name
      if (products.length === 0) {
        console.log("No products found by categoryId, trying name-based search...");
        const allProductsRes = await axios.get(`${API_BASE_URL}/api/products`, {
          params: { domainName: DOMAIN_NAME },
        });
        const allProducts = allProductsRes.data?.data || [];
        
        console.log("ALL products from backend:", allProducts.map(p => ({ name: p.name, categoryId: p.categoryId })));

        // Find products that EXACTLY match coconut charcoal (strict matching)
        products = allProducts.filter((p) => {
          const productName = p.name?.toLowerCase().trim() || "";
          const categoryNameLower = categoryName.toLowerCase().trim();
          // Exact match or charcoal-related keywords (exclude activated charcoal)
          return productName === categoryNameLower ||
                 productName.includes(categoryNameLower) ||
                 (productName.includes('coconut') && productName.includes('charcoal') && !productName.includes('activated'));
        });

        console.log("Filtered products by name:", products);
      }

      console.log("Products for category:", products);

      if (products.length === 0) {
        console.warn("No products found for category:", categoryName);
        setError(`No products found for "${categoryName}". Check backend product-category linkage.`);
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

  const fetchProductImages = async (productId) => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/product-images`, {
        params: { productId },
      });
      if (res.data.success) {
        setProductImages(res.data.data || []);
      }
    } catch (error) {
      console.error("Image fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = () => {
    if (!productImages.length) return "/default-product.jpg";
    const img = productImages[0]?.image;
    if (!img) return "/default-product.jpg";
    if (img.startsWith("data:image")) return img;
    if (img.startsWith("http")) return img;
    return `${API_BASE_URL}/${img.replace(/^\/+/, "")}`;
  };

  if (loading) return <div className="coco-charcoal-loading">Loading Product...</div>;
  if (!product) return <div className="coco-charcoal-loading">Product Not Found</div>;

  return (
    <div className="coco-charcoal-page">
      {/* HERO SECTION */}
      <div className="coco-charcoal-hero">
        <h1 className="coco-charcoal-title">{categoryName}</h1>
        <p className="coco-charcoal-subtitle">Premium Natural Charcoal</p>
      </div>

      {/* PRODUCT CARD - CENTRALIZED BADGE LAYOUT */}
      <div className="coco-charcoal-container">
        {/* TOP DECORATIVE BAR */}
        <div className="coco-charcoal-top-bar"></div>

        {/* MAIN CONTENT */}
        <div className="coco-charcoal-main">
          {/* IMAGE SECTION - TOP CENTER */}
          <div className="coco-charcoal-image-section">
            <div className="coco-charcoal-image-frame">
              <img
                src={getImageUrl()}
                alt={product.name}
                onError={(e) => (e.target.src = "/default-product.jpg")}
              />
            </div>

            {/* FEATURE BADGES */}
            <div className="coco-charcoal-feature-badges">
              <div className="coco-charcoal-feature-badge">
                <span className="icon">🌿</span>
                <span className="text">100% Natural</span>
              </div>
              <div className="coco-charcoal-feature-badge">
                <span className="icon">♻️</span>
                <span className="text">Eco Friendly</span>
              </div>
              <div className="coco-charcoal-feature-badge">
                <span className="icon">🔥</span>
                <span className="text">Long Burning</span>
              </div>
            </div>
          </div>

          {/* DETAILS SECTION - BOTTOM */}
          <div className="coco-charcoal-details">
            <h2>Product Specifications</h2>
            <div className="coco-charcoal-attributes">
              {product.attributes?.map((attr) => (
                <div className="coco-charcoal-attribute-card" key={attr.attributeId}>
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

export default CocoCharcoal;
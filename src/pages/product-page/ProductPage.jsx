import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ProductPage.css";

const ProductPage = () => {
  const { category } = useParams();

  const API_BASE = import.meta.env.VITE_API_BASE_URL;
  const domainName = import.meta.env.VITE_DOMAIN_NAME;

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadData();
  }, [category]);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      setProducts([]);

      /* ===============================
         1️⃣ Fetch Categories
      =============================== */
      const catRes = await axios.get(`${API_BASE}/categories`, {
        params: { domainName },
      });

      let categoryList = [];

      if (Array.isArray(catRes.data)) {
        categoryList = catRes.data;
      } else if (Array.isArray(catRes.data?.data)) {
        categoryList = catRes.data.data;
      } else if (Array.isArray(catRes.data?.categories)) {
        categoryList = catRes.data.categories;
      }

      setCategories(categoryList);

      /* ===============================
         2️⃣ If "all" → Load All Products
      =============================== */
      if (category === "all") {
        const prodRes = await axios.get(`${API_BASE}/products`, {
          params: { domainName },
        });

        let allProducts = [];

        if (Array.isArray(prodRes.data)) {
          allProducts = prodRes.data;
        } else if (Array.isArray(prodRes.data?.data)) {
          allProducts = prodRes.data.data;
        }

        setProducts(allProducts);
        return;
      }

      /* ===============================
         3️⃣ Find Selected Category
      =============================== */
      const activeCategory = categoryList.find(
        (c) =>
          c.slug === category ||
          c.name?.toLowerCase().replace(/\s+/g, "-") === category
      );

      if (!activeCategory) {
        setProducts([]);
        return;
      }

      /* ===============================
         4️⃣ Fetch Products By Category
      =============================== */
      const prodRes = await axios.get(`${API_BASE}/products`, {
        params: {
          domainName,
          categoryId: activeCategory._id,
        },
      });

      let filteredProducts = [];

      if (Array.isArray(prodRes.data)) {
        filteredProducts = prodRes.data;
      } else if (Array.isArray(prodRes.data?.data)) {
        filteredProducts = prodRes.data.data;
      }

      setProducts(filteredProducts);

    } catch (err) {
      console.error("Load error:", err);
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  /* ===============================
     UI Section
  =============================== */

  if (loading) return <div className="product-page">Loading...</div>;

  if (error)
    return (
      <div className="product-page">
        <p className="error-text">{error}</p>
      </div>
    );

  return (
    <div className="product-page">
      <h2 className="page-title">
        {category === "all"
          ? "All Products"
          : category?.replace(/-/g, " ")}
      </h2>

      {products.length === 0 ? (
        <p className="no-products">No products found</p>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <div key={product._id} className="product-card">
              {product.image && (
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                />
              )}
              <h3>{product.name}</h3>
              <p>{product.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductPage;
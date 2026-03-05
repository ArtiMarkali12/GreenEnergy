// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./DryCoconutShell.css";

// const DryCoconutShell = () => {
//   const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
//   const DOMAIN_NAME = import.meta.env.VITE_DOMAIN_NAME;

//   const [product, setProduct] = useState(null);
//   const [productImages, setProductImages] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchProduct();
//   }, []);

//   /* ===============================
//      FETCH PRODUCT
//   =============================== */
//   const fetchProduct = async () => {
//     try {
//       const response = await axios.get(
//         `${API_BASE_URL}/api/products`,
//         { params: { domainName: DOMAIN_NAME } }
//       );

//       if (response.data.success && response.data.data.length > 0) {
//         const products = response.data.data;

//         // Filter Dry Coconut Shell product safely
//         const filteredProduct = products.find((item) =>
//           Array.isArray(item.attributes) &&
//           item.attributes.some((attr) =>
//             attr.attributeKey === "Usage" &&
//             typeof attr.values === "string" &&
//             attr.values.toLowerCase().includes("coconut")
//           )
//         );

//         const finalProduct = filteredProduct || products[0];

//         setProduct(finalProduct);

//         // Fetch images for this product
//         fetchProductImages(finalProduct._id);
//       } else {
//         setLoading(false);
//       }

//     } catch (error) {
//       console.error("Product fetch error:", error);
//       setLoading(false);
//     }
//   };

//   /* ===============================
//      FETCH PRODUCT IMAGES
//   =============================== */
//   const fetchProductImages = async (productId) => {
//     try {
//       const response = await axios.get(
//         `${API_BASE_URL}/api/product-images`,
//         { params: { productId } }
//       );

//       if (response.data.success) {
//         setProductImages(response.data?.data || []);
//         console.log("IMAGES:", response.data?.data);
//       }

//     } catch (error) {
//       console.error("Image fetch error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ===============================
//      SAFE IMAGE HANDLER (BASE64 FIXED)
//   =============================== */
//   const getImageUrl = () => {
//     if (!productImages || productImages.length === 0) {
//       return "/default-product.jpg";
//     }

//     const imageObj = productImages[0];

//     if (!imageObj?.image) {
//       return "/default-product.jpg";
//     }

//     const imageValue = imageObj.image;

//     // ✅ If Base64 image (your case)
//     if (imageValue.startsWith("data:image")) {
//       return imageValue;
//     }

//     // ✅ If full URL
//     if (imageValue.startsWith("http")) {
//       return imageValue;
//     }

//     // ✅ If stored as file path
//     const cleanPath = imageValue.replace(/^\/+/, "");
//     return `${API_BASE_URL}/${cleanPath}`;
//   };

//   /* ===============================
//      LOADING STATE
//   =============================== */
//   if (loading) {
//     return <div className="product-loading">Loading Product...</div>;
//   }

//   if (!product) {
//     return <div className="product-loading">Product Not Found</div>;
//   }

//   return (
//     <div className="product-page">
//       <div className="product-container">

//         {/* PRODUCT IMAGE */}
//         <div className="product-image-section">
//           <img
//             src={getImageUrl()}
//             alt="Dry Coconut Shell"
//             onError={(e) => {
//               e.target.src = "/default-product.jpg";
//             }}
//           />
//         </div>

//         {/* PRODUCT DETAILS */}
//         <div className="product-details-section">
//           <h1>Dry Coconut Shell</h1>

//           <div className="attributes-grid">
//             {Array.isArray(product.attributes) &&
//             product.attributes.length > 0 ? (
//               product.attributes.map((attr) => (
//                 <div className="attribute-card" key={attr.attributeId}>
//                   <h4>{attr.attributeKey}</h4>
//                   <p>
//                     {renderAttributeValue(attr.values)}
//                     {attr.unit ? ` ${attr.unit}` : ""}
//                   </p>
//                 </div>
//               ))
//             ) : (
//               <p>No Attributes Available</p>
//             )}
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// /* ===============================
//    SAFE VALUE RENDER FUNCTION
// =============================== */
// const renderAttributeValue = (value) => {
//   if (value === null || value === undefined) return "-";
//   if (typeof value === "string" || typeof value === "number") return value;
//   if (Array.isArray(value)) return value.join(", ");
//   if (typeof value === "object") return JSON.stringify(value);
//   return "-";
// };

// export default DryCoconutShell;








import React, { useEffect, useState } from "react";
import axios from "axios";
import "./DryCoconutShell.css";

const DryCoconutShell = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const DOMAIN_NAME = import.meta.env.VITE_DOMAIN_NAME;

  const [product, setProduct] = useState(null);
  const [productImages, setProductImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryName, setCategoryName] = useState("Dry Coconut Shell");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProductByCategory();
  }, []);

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

        // Find products that EXACTLY match the category name (strict matching)
        products = allProducts.filter((p) => {
          const productName = p.name?.toLowerCase().trim() || "";
          const categoryNameLower = categoryName.toLowerCase().trim();
          // Exact match or coconut-related keywords
          return productName === categoryNameLower || 
                 productName.includes(categoryNameLower) ||
                 (categoryNameLower.includes('coconut') && productName.includes('coconut') && productName.includes('shell') && !productName.includes('charcoal'));
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
    return <div className="dry-coconut-loading">Loading Product...</div>;
  }

  if (!product) {
    return <div className="dry-coconut-loading">Product Not Found</div>;
  }

  return (
    <div className="dry-coconut-page">
      {/* HERO SECTION */}
      <div className="dry-coconut-hero">
        <h1 className="dry-coconut-title">
          {categoryName}
        </h1>
        {/* <p className="dry-coconut-subtitle">Premium Quality Product</p> */}
      </div>

      {/* PRODUCT CARD - VERTICAL SHOWCASE */}
      <div className="dry-coconut-container">
        {/* IMAGE SECTION - TOP */}
        <div className="dry-coconut-image-section">
          <div className="dry-coconut-image-wrapper">
            <img
              src={getImageUrl()}
              alt={product.name}
              onError={(e) => (e.target.src = "/default-product.jpg")}
            />
          </div>

          {/* INFO RIBBON */}
          {/* <div className="dry-coconut-info-ribbon">Premium Quality</div> */}
        </div>

        {/* DETAILS SECTION - BOTTOM */}
        <div className="dry-coconut-details">
          <h2>Product Specifications</h2>
          <div className="dry-coconut-attributes">
            {product.attributes?.map((attr) => (
              <div className="dry-coconut-attribute-card" key={attr.attributeId}>
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

export default DryCoconutShell;
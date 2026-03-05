import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Blog.css";

const Blog = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const DOMAIN_NAME = import.meta.env.VITE_DOMAIN_NAME;

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedBlog, setExpandedBlog] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/blogs`,
        {
          params: {
            domainName: DOMAIN_NAME,
          },
        }
      );

      const data = response.data;

      if (Array.isArray(data)) {
        setBlogs(data);
      } else if (Array.isArray(data.blogs)) {
        setBlogs(data.blogs);
      } else if (Array.isArray(data.data)) {
        setBlogs(data.data);
      } else {
        setBlogs([]);
      }

    } catch (err) {
      console.error("API ERROR:", err);
      setError("Failed to load blogs.");
    } finally {
      setLoading(false);
    }
  };

  const toggleReadMore = (index) => {
    setExpandedBlog(expandedBlog === index ? null : index);
  };

  if (loading) return <div className="blog-loading">Loading Blogs...</div>;
  if (error) return <div className="blog-error">{error}</div>;

  return (
    <div className="blog-page">
      <h1 className="blog-heading">Our Latest Blogs</h1>

      <div className="blog-container">
        {blogs.length > 0 ? (
          blogs.map((blog, index) => {
            const isExpanded = expandedBlog === index;
            const content = blog.content || "";
            const shouldTruncate = content.length > 200;

            return (
              <div className="blog-card" key={blog._id || index}>
                
                <div className="blog-image">
                  <img
                    src={blog.image || "https://via.placeholder.com/400x250"}
                    alt={blog.title}
                  />
                </div>

                <div className="blog-content">
                  {blog.hashtag && (
                    <span className="blog-hashtag">
                      #{blog.hashtag}
                    </span>
                  )}

                  <h2>{blog.title}</h2>
                  <h4>{blog.subtitle}</h4>

                  <p>
                    {isExpanded || !shouldTruncate
                      ? content
                      : content.substring(0, 200) + "..."}
                  </p>

                  {shouldTruncate && (
                    <button
                      className="read-more-btn"
                      onClick={() => toggleReadMore(index)}
                    >
                      {isExpanded ? "Read Less" : "Read More"}
                    </button>
                  )}

                  {blog.callToAction && (
                    <button className="blog-btn">
                      {blog.callToAction}
                    </button>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <p className="no-blogs">No blogs available.</p>
        )}
      </div>
    </div>
  );
};

export default Blog;
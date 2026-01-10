import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function ProductListPage({ token, cart, setCart }) {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceFilter, setPriceFilter] = useState("all");

  useEffect(() => {
    axios
      .get("http://electro-mart-xa02.onrender.com/api/products")
      .then((res) => setProducts(res.data))
      .catch(() => setProducts([]));
  }, []);

  // Unique categories from products (fallback to "Others" if no category)
  const categories = [
    "All",
    ...Array.from(
      new Set(
        products.map((p) => (p.category ? p.category : "Others"))
      )
    ),
  ];

  // Add to Cart function
  const addToCart = async (productId) => {
    if (!token) {
      setMessage("Login to add items to cart!");
      return;
    }

    try {
      const res = await axios.post(
        "http://electro-mart-xa02.onrender.com/api/cart/add",
        { productId, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // update global cart (Navbar updates instantly)
      setCart(res.data);
      setMessage("Item added to cart!");
    } catch (e) {
      const msg =
        e.response && e.response.data && e.response.data.error
          ? e.response.data.error
          : "Error adding to cart.";
      setMessage(msg);
    }
  };

  // Apply filters
  const filteredProducts = products.filter((p) => {
    const categoryName = p.category ? p.category : "Others";

    // Category filter
    const matchCategory =
      selectedCategory === "All" || categoryName === selectedCategory;

    // Price filter
    let matchPrice = true;
    if (priceFilter === "0-50000") {
      matchPrice = p.price <= 50000;
    } else if (priceFilter === "50001-100000") {
      matchPrice = p.price > 50000 && p.price <= 100000;
    } else if (priceFilter === "100000+") {
      matchPrice = p.price > 100000;
    }

    return matchCategory && matchPrice;
  });

  const clearFilters = () => {
    setSelectedCategory("All");
    setPriceFilter("all");
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Products</h2>

      {message && (
        <p style={{ color: "green", fontWeight: 600, marginBottom: "1rem" }}>
          {message}
        </p>
      )}

      {/* MAIN LAYOUT: SIDEBAR + PRODUCTS */}
      <div
        style={{
          display: "flex",
          gap: "2rem",
          alignItems: "flex-start",
        }}
      >
        {/* LEFT SIDEBAR – FILTERS */}
        <aside
          style={{
            width: "260px",
            background: "#ffffff",
            borderRadius: "12px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
            padding: "1.25rem 1.5rem",
          }}
        >
          <h3 style={{ marginTop: 0, marginBottom: "1rem" }}>Filters</h3>

          {/* Category Filter */}
          <div style={{ marginBottom: "1.5rem" }}>
            <h4 style={{ marginBottom: "0.5rem", fontSize: "1rem" }}>
              Category
            </h4>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  padding: "6px 10px",
                  marginBottom: "4px",
                  borderRadius: "8px",
                  border:
                    selectedCategory === cat
                      ? "2px solid #3182ce"
                      : "1px solid #e5e7eb",
                  background:
                    selectedCategory === cat ? "#eff6ff" : "#ffffff",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Price Filter */}
          <div style={{ marginBottom: "1.5rem" }}>
            <h4 style={{ marginBottom: "0.5rem", fontSize: "1rem" }}>
              Price
            </h4>
            <label style={{ display: "block", marginBottom: "4px" }}>
              <input
                type="radio"
                name="price"
                value="all"
                checked={priceFilter === "all"}
                onChange={(e) => setPriceFilter(e.target.value)}
                style={{ marginRight: "6px" }}
              />
              All
            </label>
            <label style={{ display: "block", marginBottom: "4px" }}>
              <input
                type="radio"
                name="price"
                value="0-50000"
                checked={priceFilter === "0-50000"}
                onChange={(e) => setPriceFilter(e.target.value)}
                style={{ marginRight: "6px" }}
              />
              Up to ₹50,000
            </label>
            <label style={{ display: "block", marginBottom: "4px" }}>
              <input
                type="radio"
                name="price"
                value="50001-100000"
                checked={priceFilter === "50001-100000"}
                onChange={(e) => setPriceFilter(e.target.value)}
                style={{ marginRight: "6px" }}
              />
              ₹50,001 – ₹1,00,000
            </label>
            <label style={{ display: "block", marginBottom: "4px" }}>
              <input
                type="radio"
                name="price"
                value="100000+"
                checked={priceFilter === "100000+"}
                onChange={(e) => setPriceFilter(e.target.value)}
                style={{ marginRight: "6px" }}
              />
              Above ₹1,00,000
            </label>
          </div>

          {/* Clear Filters */}
          <button
            onClick={clearFilters}
            style={{
              width: "100%",
              padding: "8px 10px",
              borderRadius: "8px",
              border: "none",
              background: "#4b5563",
              color: "#ffffff",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Clear Filters
          </button>
        </aside>

        {/* RIGHT SIDE – PRODUCTS GRID */}
        <div style={{ flex: 1 }}>
          <div
            style={{
              display: "flex",
              gap: "2rem",
              flexWrap: "wrap",
            }}
          >
            {filteredProducts.map((p) => (
              <div
                key={p._id}
                style={{
                  border: "1px solid #e5e7eb",
                  padding: "1rem",
                  borderRadius: "12px",
                  width: "250px",
                  background: "#fafafa",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                }}
              >
                <Link
                  to={`/products/${p._id}`}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    style={{
                      width: "100%",
                      height: "160px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                  <h3 style={{ marginTop: "0.6rem" }}>{p.name}</h3>
                </Link>

                <p style={{ fontSize: "0.9rem", color: "#4b5563" }}>
                  {p.description}
                </p>
                <p>
                  <b>₹{p.price}</b>
                </p>

                <button
                  onClick={() => addToCart(p._id)}
                  style={{
                    background: "#3182ce",
                    color: "white",
                    padding: "8px 12px",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontWeight: "600",
                    marginTop: "0.5rem",
                  }}
                >
                  Add to Cart
                </button>
              </div>
            ))}

            {filteredProducts.length === 0 && (
              <p>No products found for this filter.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

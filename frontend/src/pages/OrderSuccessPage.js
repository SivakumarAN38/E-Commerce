import React from "react";
import { Link } from "react-router-dom";

export default function OrderSuccessPage() {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "4rem 2rem",
        maxWidth: "700px",
        margin: "0 auto",
      }}
    >
      {/* Success Icon */}
      <div
        style={{
          width: "120px",
          height: "120px",
          borderRadius: "50%",
          background: "#10b98133",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "1.5rem",
        }}
      >
        <span style={{ fontSize: "60px", color: "#10b981" }}>✔</span>
      </div>

      <h1 style={{ fontSize: "2rem", fontWeight: "800", color: "#1f2937" }}>
        Order Placed Successfully!
      </h1>

      <p style={{ fontSize: "1.1rem", color: "#4b5563", marginTop: "0.6rem" }}>
        Thank you for shopping with us.  
        Your order has been received and is being processed.
      </p>

      <div style={{ marginTop: "2rem" }}>
        <Link
          to="/products"
          style={{
            background: "#0ea5e9",
            color: "white",
            padding: "12px 24px",
            borderRadius: "10px",
            fontWeight: "700",
            textDecoration: "none",
            marginRight: "1rem",
          }}
        >
          Continue Shopping
        </Link>

        <Link
          to="/"
          style={{
            background: "white",
            border: "2px solid #0ea5e9",
            color: "#0ea5e9",
            padding: "12px 24px",
            borderRadius: "10px",
            fontWeight: "700",
            textDecoration: "none",
          }}
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
}

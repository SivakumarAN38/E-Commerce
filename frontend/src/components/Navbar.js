import { Link } from 'react-router-dom';
import React, { useState } from "react";

export default function Navbar({ user, cart = [] }) {

  // Hoverable link component
  const NavLink = ({ to, children, style }) => {
    const [hover, setHover] = useState(false);

    return (
      <Link
        to={to}
        style={{
          color: hover ? "#facc15" : "white",
          marginRight: "20px",
          textDecoration: "none",
          transition: "0.2s",
          cursor: "pointer",
          ...style
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {children}
      </Link>
    );
  };

  // Hover logout link
  const LogoutLink = ({ children }) => {
    const [hover, setHover] = useState(false);

    return (
      <a
        href="/"
        style={{
          color: hover ? "#facc15" : "white",
          textDecoration: "none",
          transition: "0.2s",
          cursor: "pointer",
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={() => {
          localStorage.removeItem("token");
          window.location.reload();
        }}
      >
        {children}
      </a>
    );
  };

  return (
    <nav
      style={{
        background: "#1a202c",
        padding: "1rem",
        color: "white",
        alignItems: "center",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      {/* LEFT SIDE LOGO */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src="\Logo.png"
          alt="Logo"
          style={{
            height: "45px",
            marginBottom: "-12px",
            marginRight: "10px"
          }}
        />
        <span
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            color: "#facc15"
          }}
        >
          E-Shop
        </span>
      </div>

      {/* RIGHT SIDE LINKS */}
      <div style={{ display: "flex", alignItems: "center" }}>

        <NavLink to="/">Home</NavLink>
        <NavLink to="/products">Products</NavLink>

        {/* 🛒 CART ICON WITH COUNT BADGE */}
        <div style={{ position: "relative", marginRight: "20px" }}>
          <Link
            to="/cart"
            style={{
              color: "white",
              fontSize: "1.6rem",
              textDecoration: "none",
              transition: "0.2s",
            }}
          >
            🛒
          </Link>

          {/* BADGE */}
          {cart.length > 0 && (
            <span
              style={{
                position: "absolute",
                top: "-6px",
                right: "-10px",
                background: "#facc15",
                color: "black",
                padding: "3px 7px",
                borderRadius: "50%",
                fontSize: "0.75rem",
                fontWeight: "bold",
              }}
            >
              {cart.length}
            </span>
          )}
        </div>

        {/* USER AUTH LINKS */}
        {user ? (
          <>
            <NavLink to="/profile">{user.username}</NavLink>
            <LogoutLink>Logout</LogoutLink>
          </>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </>
        )}
      </div>
    </nav>
  );
}

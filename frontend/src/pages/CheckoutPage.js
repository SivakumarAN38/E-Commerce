import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CheckoutPage({ cart }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    paymentMethod: "COD",
  });

  // handle form field change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // calculate totals
  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const shipping = subtotal > 999 ? 0 : 40;
  const total = subtotal + shipping;

  const handleOrder = () => {
    // Basic validation
    if (
      !form.fullName ||
      !form.phone ||
      !form.address ||
      !form.city ||
      !form.state ||
      !form.pincode
    ) {
      alert("Please fill all the required fields.");
      return;
    }

    // later you can send this to backend before navigating
    // e.g. axios.post('/api/orders', { cart, form })

    navigate("/order-success");
  };

  return (
    <div style={{ maxWidth: "900px", margin: "2rem auto", padding: "2rem" }}>
      <h2>Checkout</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "2rem",
        }}
      >
        {/* LEFT SECTION — Address Form */}
        <div>
          <h3>Delivery Details</h3>

          <div
            style={{
              background: "#fff",
              padding: "1.5rem",
              borderRadius: "12px",
              boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
            }}
          >
            <label>Full Name*</label>
            <input
              name="fullName"
              type="text"
              placeholder="Enter your full name"
              value={form.fullName}
              onChange={handleChange}
              style={inputStyle}
            />

            <label>Email (optional)</label>
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              style={inputStyle}
            />

            <label>Phone Number*</label>
            <input
              name="phone"
              type="text"
              placeholder="10-digit number"
              value={form.phone}
              onChange={handleChange}
              style={inputStyle}
            />

            <label>Address*</label>
            <textarea
              name="address"
              placeholder="House No, Street, Area"
              value={form.address}
              onChange={handleChange}
              style={{ ...inputStyle, height: "80px" }}
            />

            <div style={{ display: "flex", gap: "1rem" }}>
              <div style={{ flex: 1 }}>
                <label>City*</label>
                <input
                  name="city"
                  type="text"
                  placeholder="City"
                  value={form.city}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </div>

              <div style={{ flex: 1 }}>
                <label>State*</label>
                <input
                  name="state"
                  type="text"
                  placeholder="State"
                  value={form.state}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </div>
            </div>

            <label>Pincode*</label>
            <input
              name="pincode"
              type="text"
              placeholder="6-digit PIN"
              value={form.pincode}
              onChange={handleChange}
              style={inputStyle}
            />

            <label>Payment Method*</label>
            <select
              name="paymentMethod"
              value={form.paymentMethod}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value="COD">Cash on Delivery</option>
              <option value="ONLINE" disabled>
                Online Payment (Coming Soon)
              </option>
            </select>
          </div>
        </div>

        {/* RIGHT SECTION — Order Summary */}
        <div>
          <h3>Order Summary</h3>

          <div
            style={{
              background: "#fff",
              padding: "1.5rem",
              borderRadius: "12px",
              boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
            }}
          >
            {cart.map((item) => (
              <div
                key={item.product._id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "0.7rem",
                }}
              >
                <span>
                  {item.product.name} (x{item.quantity})
                </span>
                <span>₹{item.product.price * item.quantity}</span>
              </div>
            ))}

            <hr />

            <div style={summaryRow}>
              <span>Subtotal:</span>
              <strong>₹{subtotal}</strong>
            </div>

            <div style={summaryRow}>
              <span>Shipping:</span>
              <strong>{shipping === 0 ? "Free" : `₹${shipping}`}</strong>
            </div>

            <div style={{ ...summaryRow, fontSize: "1.1rem", fontWeight: 700 }}>
              <span>Total:</span>
              <span>₹{total}</span>
            </div>

            <button
              style={{
                background: "#10b981",
                width: "100%",
                padding: "0.9rem",
                border: "none",
                borderRadius: "10px",
                color: "#fff",
                fontWeight: "700",
                cursor: "pointer",
                marginTop: "1rem",
              }}
              onClick={handleOrder}
            >
              Confirm Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Reusable input style
const inputStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #ff3e3eff",
  marginBottom: "12px",
  marginTop: "4px",
};

const summaryRow = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "0.4rem",
};

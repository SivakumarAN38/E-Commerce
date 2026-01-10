import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CartPage({ cart, setCart, token }) {
  const navigate = useNavigate();

  // Load latest cart when page opens
  useEffect(() => {
    if (!token) return;

    fetch('http://electro-mart-xa02.onrender.com/api/cart', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(items => setCart(items))
      .catch(err => console.error('Error loading cart:', err));
  }, [token, setCart]);

  const removeFromCart = id => {
    fetch('http://electro-mart-xa02.onrender.com/api/cart/remove', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ productId: id }),
    })
      .then(res => res.json())
      .then(items => setCart(items));
  };

  // 🟩 NO TAX — only subtotal + shipping
  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const shipping = subtotal > 999 ? 0 : 40;
  const total = subtotal + shipping;

  // inline styles so you don't need extra CSS files
  const pageStyle = {
    padding: '3rem 2rem',
    maxWidth: '1100px',
    margin: '0 auto',
  };

  const layoutStyle = {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '2rem',
    alignItems: 'flex-start',
  };

  const cardStyle = {
    background: '#ffffff',
    borderRadius: '12px',
    padding: '1.25rem 1.5rem',
    boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
  };

  const thStyle = {
    padding: '0.75rem 0.5rem',
    borderBottom: '1px solid #e5e7eb',
    fontWeight: 700,
    fontSize: '0.95rem',
    textAlign: 'left',
  };

  const tdStyle = {
    padding: '0.75rem 0.5rem',
    borderBottom: '1px solid #f3f4f6',
    fontSize: '0.95rem',
  };

  const tdCenter = { ...tdStyle, textAlign: 'center' };
  const tdRight = { ...tdStyle, textAlign: 'right' };

  return (
    <div style={pageStyle}>
      <h2 style={{ marginBottom: '1.5rem' }}>Your Cart</h2>

      {cart.length === 0 ? (
        <div style={cardStyle}>
          <p>Cart is empty.</p>
        </div>
      ) : (
        <div style={layoutStyle}>
          {/* LEFT – table */}
          <div style={cardStyle}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>Product</th>
                  <th style={{ ...thStyle, textAlign: 'center' }}>Qty</th>
                  <th style={{ ...thStyle, textAlign: 'right' }}>Price</th>
                  <th style={{ ...thStyle, textAlign: 'right' }}>Remove</th>
                </tr>
              </thead>
              <tbody>
                {cart.map(item => (
                  <tr key={item.product._id}>
                    <td style={tdStyle}>{item.product.name}</td>
                    <td style={tdCenter}>{item.quantity}</td>
                    <td style={tdRight}>₹{item.product.price}</td>
                    <td style={tdRight}>
                      <button
                        onClick={() => removeFromCart(item.product._id)}
                        style={{
                          background: '#e53e3e',
                          color: 'white',
                          padding: '6px 12px',
                          border: 'none',
                          borderRadius: '8px',
                          fontWeight: 600,
                          cursor: 'pointer',
                        }}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* RIGHT – summary card */}
          <aside style={cardStyle}>
            <h3 style={{ marginTop: 0, marginBottom: '1rem' }}>Order Summary</h3>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
              <span>Shipping</span>
              <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '0.8rem',
                fontWeight: 700,
                fontSize: '1.1rem',
              }}
            >
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            <button
              style={{
                marginTop: '1rem',
                width: '100%',
                padding: '0.75rem',
                borderRadius: '10px',
                border: 'none',
                background: '#10b981',
                color: '#ffffff',
                fontWeight: 700,
                cursor: 'pointer',
              }}
              onClick={() => navigate('/checkout')}
            >
              Proceed to Checkout
            </button>
          </aside>
        </div>
      )}
    </div>
  );
}

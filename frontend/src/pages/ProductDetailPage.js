import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function ProductDetailPage({ token, cart, setCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [message, setMessage] = useState('');

  // Load product details
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch(() => setMessage('Error loading product.'));
  }, [id]);

  // Add to Cart Function
  const addToCart = async () => {
    if (!token) {
      setMessage('Login to add to cart!');
      return;
    }

    try {
      const res = await axios.post(
        'http://localhost:5000/api/cart/add',
        { productId: id, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // 🔥 Update global cart instantly → updates Navbar badge too
      setCart(res.data);

      setMessage('Added to cart!');
    } catch (e) {
      const msg =
        e.response && e.response.data && e.response.data.error
          ? e.response.data.error
          : 'Error adding to cart.';
      setMessage(msg);
    }
  };

  if (!product) return <div style={{ padding: '2rem' }}>Loading...</div>;

  return (
    <div style={{ padding: '2rem' }}>
      <img src={product.image} alt={product.name} style={{ width: '350px' }} />
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>
        <b>₹{product.price}</b>
      </p>

      <button
        onClick={addToCart}
        style={{
          background: '#3182ce',
          color: 'white',
          padding: '10px 16px',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: '600',
          marginTop: '1rem',
        }}
      >
        Add to Cart
      </button>

      <div style={{ marginTop: '1rem', color: 'green', fontWeight: '600' }}>
        {message}
      </div>
    </div>
  );
}

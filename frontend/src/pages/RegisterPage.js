import React, { useState } from 'react';
import axios from 'axios';

export default function RegisterPage() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/users/register', form, {
        headers: { 'Content-Type': 'application/json' }
      });

      // if server returns token, save it
      if (res.data?.token) {
        localStorage.setItem('token', res.data.token);
      }

      setMessage(res.data?.message || 'User registered. Please login!');
    } catch (err) {
      console.error('Register failed:', err.response?.data ?? err.message);
      setMessage(err.response?.data?.error || err.response?.data?.message || 'Error registering user');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '2rem', maxWidth: '400px' }}>
      <h2>Register</h2>
      <input
        required
        value={form.username}
        placeholder="Username"
        style={{ width: '100%', marginBottom: '1rem', padding: '.5rem' }}
        onChange={e => setForm({ ...form, username: e.target.value })}
      />
      <input
        required
        type="password"
        value={form.password}
        placeholder="Password"
        style={{ width: '100%', marginBottom: '1rem', padding: '.5rem' }}
        onChange={e => setForm({ ...form, password: e.target.value })}
      />
      <button type="submit" style={{ background: '#38a169', color: 'white', border: 'none', padding: '8px 14px' }}>
        Register
      </button>
      <br />
      <span>{message}</span>
    </form>
  );
}

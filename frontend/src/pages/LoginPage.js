import React, { useState } from 'react';
import axios from 'axios';

export default function LoginPage({ setToken }) {
  const [form, setForm] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    axios.post('http://electro-mart-xa02.onrender.com/api/users/login', form)
      .then(res => {
        setMessage('Login successful!');
        setToken(res.data.token);
        localStorage.setItem('token', res.data.token);
      })
      .catch(() => setMessage('Invalid credentials'));
  };

  return (
    <center>
       <form onSubmit={handleSubmit} style={{padding:'2rem',maxWidth:'400px'}}>
      <h2 style={{color:'#3182ce', height:'30px'}}>Log-In</h2>
      <input required placeholder="Username" style={{width:'90%',marginBottom:'1rem',padding:'.5rem',border:'2px solid #3182ce',borderRadius:'40px'}}
        onChange={e => setForm({...form, username: e.target.value})}
      />
      <input required type="password" placeholder="Password" style={{width:'90%',border:'2px solid #3182ce',borderRadius:'40px',marginBottom:'1rem',padding:'.5rem'}}
        onChange={e => setForm({...form, password: e.target.value})}
      />
      <button type="submit" style={{background:'#3182ce',color:'white',border:'none',padding:'8px 14px', width:'100px',borderRadius:'20px'}}>Login</button>
      <br /><span>{message}</span>
    </form>
    </center>
   
  );
}

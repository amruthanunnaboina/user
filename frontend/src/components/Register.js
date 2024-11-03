import React, { useState } from 'react';
import { registerUser } from '../api';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); 

  const handleRegister = async () => {
    if (!name || !email || !password) {
      setError('All fields are required!');
      return;
    }

    setError('');

    console.log("Registering User:", { name, email, password }); 

    try {
      const response = await registerUser({ name, email, password });
      console.log("Response from registration:", response.data);
      alert('Registration successful. Please log in.');
      window.location.href = '/login';
    } catch (error) {
      console.error('Registration failed:', error.response ? error.response.data : error.message);
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>} 
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)} 
          placeholder="Name"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Password"
          required
        />
        <button type="button" onClick={handleRegister}>Register</button> 
      </form>
    </div>
  );
};

export default Register;


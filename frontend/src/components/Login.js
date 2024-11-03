import React, { useState } from 'react';
import { loginUser } from '../api'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setError(''); 

    console.log("Logging in User:", { email, password }); 

    try {
      const response = await loginUser({ email, password });
      console.log("Response from login:", response.data.user);
      alert('Login successful!');
      window.localStorage.setItem('token', response.data.token); 
      window.localStorage.setItem('user', JSON.stringify({
        email: response.data.user.email, 
        lastLoginTime: new Date().toISOString(),
        photo: null 
      }));

      window.location.href = '/'; 
    } catch (error) {
      console.error('Login failed:', error.response ? error.response.data : error.message);
      setError('Login failed. Please try again.'); 
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={(e) => e.preventDefault()}>
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
        <button type="button" onClick={handleLogin}>Login</button>
      </form>
    </div>
  );
};

export default Login;
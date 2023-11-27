// Login.js
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ toggleAdminStatus }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {

    
  axios.get(`http://localhost:3001/users?username=${username}`).then(res=>
{  if(res.data.length>0){
  if (username === 'admin' && password === 'admin') {
   
    toggleAdminStatus();

    navigate('/admin');
  } else {
  if (username === res.data[0].username && password === res.data[0].password) {
    localStorage.setItem("userId",res.data[0].id)
    navigate('/dashboard/'+ res.data[0].id);
  } else {
    console.log('Authentification échouée');
  }
  }}}
  )
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Login</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username:</label>
          <input
            type="text"
            id="username"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password:</label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="button" className="btn btn-primary" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;

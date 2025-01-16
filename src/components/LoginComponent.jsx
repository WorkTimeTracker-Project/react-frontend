import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginComponent() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === 'admin' && password === 'admin') {
      localStorage.setItem('isLoggedIn', 'true');

      navigate('/erfassung/arbeitszeiten');
    } else {
      alert('Falsche Anmeldedaten');
    }
  };

  return (
    <div className="container">
      <h2>Admin Login</h2>
      <div className="form-group">
        <label htmlFor="username">Benutzername</label>
        <input
          type="text"
          id="username"
          className="form-control"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Passwort</label>
        <input
          type="password"
          id="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className="btn btn-primary mt-3" onClick={handleLogin}>
        Einloggen
      </button>
    </div>
  );
}

export default LoginComponent;

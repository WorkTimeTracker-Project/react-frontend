import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminUIComponent() {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handlePasswordSubmit = () => {
    if (password === localStorage.getItem('password')) { 
      localStorage.setItem('isLoggedInAdmin', 'true');
      navigate('/admin-dashboard'); 
    } else {
      alert('Falsches Passwort');
    }
  };

  return (
    <div className="container">
      <h2>Admin Tools - Passwort eingeben</h2>
      <div className="form-group">
        <label htmlFor="admin-password">Passwort</label>
        <input
          type="password"
          id="admin-password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className="btn btn-primary mt-3" onClick={handlePasswordSubmit}>
        Einloggen
      </button>
    </div>
  );
}

export default AdminUIComponent;

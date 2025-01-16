import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addEmployee } from '../services/EmployeeService';

function AddEmployee() {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Name darf nicht leer sein');
      return;
    }

    addEmployee(name)
      .then(() => {
        alert(`Mitarbeiter ${name} erfolgreich hinzugefügt`);
        navigate('/admin-dashboard'); 
      })
      .catch((err) => {
        console.error(err);
        setError('Fehler beim Hinzufügen des Mitarbeiters');
      });
  };

  return (
    <div className="container">
      <h2>Mitarbeiter hinzufügen</h2>

      <button
        className="btn btn-outline-secondary mb-4"
        onClick={() => (window.location.href = '/admin-dashboard')}
      >
        <i className="bi bi-arrow-left-circle me-2"></i>Zurück
      </button>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Mitarbeitername
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit" className="btn btn-primary">
          Hinzufügen
        </button>
      </form>
    </div>
  );
}

export default AddEmployee;

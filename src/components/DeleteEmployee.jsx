import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteEmployee, fetchEmployees, getAllEmployees } from '../services/EmployeeService';

function DeleteEmployee() {
  const [error, setError] = useState('');
  const [employees, setEmployees] = useState([]);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees(setEmployees);
  }, []);

  const confirmDelete = (employee) => {
    setEmployeeToDelete(employee);
  };

  const handleDelete = async () => {
    try {
      await deleteEmployee(employeeToDelete.name);
      alert(`Mitarbeiter ${employeeToDelete.name} erfolgreich gelöscht`);
      setEmployees((prev) => prev.filter((e) => e.name !== employeeToDelete.name));
      setEmployeeToDelete(null);
      navigate('/admin-dashboard');
    } catch (err) {
      console.error(err);
      setError('Fehler beim Löschen des Mitarbeiters');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Mitarbeiter Löschen</h2>

      <button
        className="btn btn-outline-secondary mb-4"
        onClick={() => (window.location.href = '/admin-dashboard')}
      >
        <i className="bi bi-arrow-left-circle me-2"></i>Zurück
      </button>

      <div className="d-flex flex-wrap justify-content-center">
        {employees.map((employee, index) => (
          <button
            key={index}
            className="btn btn-danger m-2"
            style={{ minWidth: '200px', borderRadius: '5px', fontSize: '1rem' }}
            onClick={() => confirmDelete(employee)}
          >
            {employee.name}
          </button>
        ))}
      </div>

      {employeeToDelete && (
        <div
          className="modal show d-block"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          tabIndex="-1"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Bestätigung</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setEmployeeToDelete(null)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Möchten Sie den Mitarbeiter {employeeToDelete.name} wirklich löschen?</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setEmployeeToDelete(null)}
                >
                  Abbrechen
                </button>
                <button type="button" className="btn btn-danger" onClick={handleDelete}>
                  Löschen
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DeleteEmployee;

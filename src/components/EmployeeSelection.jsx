import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchEmployees, getAllEmployees } from '../services/EmployeeService'; 


function EmployeeSelection() {

  const [employees, setEmployees] = useState([]);
    

  useEffect(() => {
    fetchEmployees(setEmployees);
  }, []);


  const navigate = useNavigate();

  const handleEmployeeSelection = (employee) => {
    console.log(employee.name, "Mitarbeitername")
    navigate(`/work-session/${employee.name}`);
  };

  const handleAdminTools = () => {
    navigate('/admin'); 
  };

  return (
    <div className="container">
      <h2 className="mt-4 mb-4 text-center">Arbeitszeiterfassung</h2>
      <div className="d-flex flex-wrap justify-content-center">
        {employees.map((employee, index) => (
          <button
            key={index}
            className="btn btn-outline-primary m-2"
            style={{ minWidth: '200px' }}
            onClick={() => handleEmployeeSelection(employee)}>
            {employee.name}
          </button>
        ))}
      </div>

      <div className="text-center mt-4">
        <button className="btn btn-warning" onClick={handleAdminTools}>
          Admin-Tools
        </button>
      </div>
    </div>
  );
}

export default EmployeeSelection;

import React, { useEffect, useState } from 'react';
import { listWorkSessions, listWorkSessionsbyDate, updateWorkSession } from '../services/WorkSessionService';
import { fetchEmployees, getAllEmployees } from '../services/EmployeeService'; 
import * as XLSX from 'xlsx';


function ListWorkSession() {
  const [workSessions, setWorkSessions] = useState([]);
  const [employeeName, setEmployeeName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filterByDate, setFilterByDate] = useState(false);
  const [employees, setEmployees] = useState([]);

  const [isEditing, setIsEditing] = useState(false);  
  const [selectedWorkSession, setSelectedWorkSession] = useState(null);
  
  const fetchWorkSessions = () => {
    if (filterByDate && startDate && endDate) {
      listWorkSessionsbyDate(employeeName, startDate, endDate)
        .then((response) => {
          setWorkSessions(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      listWorkSessions(employeeName)
        .then((response) => {
          setWorkSessions(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };


  useEffect(() => {
    fetchEmployees(setEmployees, setEmployeeName);
  }, []);

  useEffect(() => {
    if (employeeName) {
      fetchWorkSessions();
    }
  }, [employeeName, startDate, endDate, filterByDate]);

  const handleEdit = (workSession) => {
    setSelectedWorkSession(workSession);
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    if (selectedWorkSession) {
      updateWorkSession(selectedWorkSession)
        .then(() => {
          alert('Arbeitszeit erfolgreich bearbeitet');
          setIsEditing(false); 
          setSelectedWorkSession(null);
          fetchWorkSessions();  
        })
        .catch((error) => {
          console.error(error);
          alert('Fehler beim Bearbeiten der Arbeitszeit');
        });
    }
  };

  const exportToExcel = () => {
    const wsData = [
      ['Name', 'Startzeit', 'Endzeit', 'Gesamte Arbeitszeit', 'Datum'],
      
      ...workSessions.map(workSession => [
        workSession.employeeName,
        workSession.startTime,
        workSession.endTime,
        workSession.totalWorkTime,
        workSession.date,
      ]),
    ];

    const ws = XLSX.utils.json_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Arbeitszeiten');
    XLSX.writeFile(wb, 'Arbeitszeiten.xlsx');
  };

  return (
    <div className="container">
      <h2 className="text-center mb-4">Arbeitszeiten</h2>

      <button
        className="btn btn-outline-primary px-4 py-2 fw-bold"
        onClick={() => (window.location.href = '/erfassung/arbeitszeiten')}
      >
        <i className="bi bi-arrow-left-circle me-2"></i>Zurück zur Arbeitszeiterfassung
      </button>

      <button
        className="btn btn-outline-primary px-4 py-2 fw-bold"
        onClick={() => (window.location.href = '/employee/add')}
      >
        <i className="bi bi-arrow-left-circle me-2"></i>Mitarbeiter hinzufügen
      </button>

      <button
        className="btn btn-outline-primary px-4 py-2 fw-bold"
        onClick={() => (window.location.href = '/employee/delete')}
      >
        <i className="bi bi-arrow-left-circle me-2"></i>Mitarbeiter löschen
      </button>

      <div className="mb-3">
        <label htmlFor="employeeName" className="form-label">
          Mitarbeiter Name
        </label>
        <select
          className="form-select"
          id="employeeName"
          value={employeeName}
          onChange={(e) => setEmployeeName(e.target.value)}
        >
          {employees.map((employee, index) => (
            <option key={index} value={employee.name}>
              {employee.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="filterByDate"
          checked={filterByDate}
          onChange={(e) => setFilterByDate(e.target.checked)}
        />
        <label className="form-check-label" htmlFor="filterByDate">
          Arbeitszeiten nach Datum filtern
        </label>
      </div>

      {filterByDate && (
        <div className="mb-3">
          <label htmlFor="startDate" className="form-label">
            Startdatum
          </label>
          <input
            type="date"
            className="form-control"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
      )}

      {filterByDate && (
        <div className="mb-3">
          <label htmlFor="endDate" className="form-label">
            Enddatum
          </label>
          <input
            type="date"
            className="form-control"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      )}

      <button className="btn btn-success mb-3" onClick={exportToExcel}>
        Exportiere als Excel
      </button>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Startzeit</th>
            <th>Endzeit</th>
            <th>Gesamte Arbeitszeit</th>
            <th>Datum</th>
            <th>Aktionen</th>
          </tr>
        </thead>
        <tbody>
          {workSessions.map((workSession) => (
            <tr key={workSession.id}>
              <td>{workSession.employeeName}</td>
              <td>{workSession.startTime}</td>
              <td>{workSession.endTime}</td>
              <td>{workSession.totalWorkTime}</td>
              <td>{workSession.date}</td>
              <td>
                <button
                  className="btn btn-warning"
                  onClick={() => handleEdit(workSession)}
                >
                  Bearbeiten
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isEditing && selectedWorkSession && (
        <div className="mt-4">
          <h4>Arbeitszeit bearbeiten</h4>
          <div className="mb-3">
            <label htmlFor="editStartTime" className="form-label">
              Startzeit
            </label>
            <input
              type="time"
              className="form-control"
              id="editStartTime"
              value={selectedWorkSession.startTime}
              onChange={(e) =>
                setSelectedWorkSession({
                  ...selectedWorkSession,
                  startTime: e.target.value,
                })
              }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="editEndTime" className="form-label">
              Endzeit
            </label>
            <input
              type="time"
              className="form-control"
              id="editEndTime"
              value={selectedWorkSession.endTime}
              onChange={(e) =>
                setSelectedWorkSession({
                  ...selectedWorkSession,
                  endTime: e.target.value,
                })
              }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="editDate" className="form-label">
              Datum
            </label>
            <input
              type="date"
              className="form-control"
              id="editDate"
              value={selectedWorkSession.date}
              onChange={(e) =>
                setSelectedWorkSession({
                  ...selectedWorkSession,
                  date: e.target.value,
                })
              }
            />
          </div>
          <button
            className="btn btn-success"
            onClick={handleSaveEdit}
          >
            Änderungen speichern
          </button>
          <button
            className="btn btn-secondary ml-2"
            onClick={() => setIsEditing(false)}
          >
            Abbrechen
          </button>
        </div>
      )}
    </div>
  );
}

export default ListWorkSession;

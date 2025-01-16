import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { startWorkSession, endWorkSession } from '../services/WorkSessionService';
import { listWorkSessions, listWorkSessionsbyDate, updateWorkSession } from '../services/WorkSessionService';


function WorkSessionComponent() {
  const { employeeName } = useParams();
  const navigate = useNavigate();

  const [isWorkStarted, setIsWorkStarted] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [workSessions, setWorkSessions] = useState([]);
  

  useEffect(() => {
    const savedStatus = localStorage.getItem(`workStatus-${employeeName}`);
    if (savedStatus === 'started') {
      setIsWorkStarted(true);
    }
  }, [employeeName]);

    const fetchWorkSessions = () => {
        listWorkSessions(employeeName)
          .then((response) => {
            setWorkSessions(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
    };

    

  useEffect(() => {
    if (employeeName) {
      fetchWorkSessions();
    }
  }, [employeeName]);

  const handleStartWork = () => {
    startWorkSession(employeeName)
      .then(response => {
        setIsWorkStarted(true);
        setToastMessage(`Arbeitszeit für ${employeeName} wurde gestartet!`);
        setShowToast(true);
        localStorage.setItem(`workStatus-${employeeName}`, 'started');
        setTimeout(() => {
          navigate('/erfassung/arbeitszeiten');
        }, 2000);
      })
      .catch(error => {
        console.error(error);
        setToastMessage('Fehler beim Starten der Arbeitszeit!');
        setShowToast(true);
      });
  };

  const handleEndWork = () => {
    endWorkSession(employeeName)
      .then(response => {
        setIsWorkStarted(false);
        setToastMessage(`Arbeitszeit für ${employeeName} wurde beendet!`);
        setShowToast(true);
        localStorage.setItem(`workStatus-${employeeName}`, 'ended');
        setTimeout(() => {
          navigate('/erfassung/arbeitszeiten');
        }, 2000);
      })
      .catch(error => {
        console.error(error);
        setToastMessage('Fehler beim Beenden der Arbeitszeit!');
        setShowToast(true);
      });
  };

  return (
    <div className='container'>
      <h2 className="mt-4 mb-4 text-center">Arbeitszeiterfassung für {employeeName}</h2>

      <div className="text-center">
        {isWorkStarted ? (
          <button
            className="btn btn-danger mx-2"
            style={{ minWidth: '150px' }}
            onClick={handleEndWork}>
            Gehen
          </button>
        ) : (
          <button
            className="btn btn-success mx-2"
            style={{ minWidth: '150px' }}
            onClick={handleStartWork}>
            Kommen
          </button>
        )}
      </div>

      {showToast && (
        <div className="position-fixed bottom-0 end-0 p-3">
          <div className="toast show" role="alert" aria-live="assertive" aria-atomic="true">
            <div className="toast-header">
              <strong className="me-auto">Benachrichtigung</strong>
              <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div className="toast-body">
              {toastMessage}
            </div>
          </div>
        </div>
      )}

<table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Startzeit</th>
            <th>Endzeit</th>
            <th>Gesamte Arbeitszeit</th>
            <th>Datum</th>
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default WorkSessionComponent;

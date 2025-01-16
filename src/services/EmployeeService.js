import axios from 'axios';

const API_BASE_URL = 'http://192.168.2.174:8080/api/work-sessions/employee'; 

export const getAllEmployees = async () => {
  const response = await axios.get(API_BASE_URL);
  return response.data;
};

export const addEmployee = async (name) => {
  const response = await axios.post(`${API_BASE_URL}/add/${name}`);
  return response.data;
};

export const deleteEmployee = async (name) => {
  const response = await axios.delete(`${API_BASE_URL}/delete/${name}`);
  return response.data;
};


export const fetchEmployees = async (setEmployees, setEmployeeName) => {
    try {
      const employeesData = await getAllEmployees();
      console.log('Geladene Mitarbeiter:', employeesData);
      setEmployees(employeesData);
      if(setEmployeeName) {
        setEmployeeName(employeesData[0].name);
      }
    } catch (error) {
      console.error('Fehler beim Laden der Mitarbeiter:', error);
    }
};

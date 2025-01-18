import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

const API_BASE_URL = `${apiUrl}/api/work-sessions`; 

export const getAllEmployees = async () => {
  const employer = localStorage.getItem('username'); 
  const response = await axios.get(`${API_BASE_URL}/${employer}/employee`);
  return response.data;
};

export const addEmployee = async (name) => {
  const employer = localStorage.getItem('username');
  const response = await axios.post(`${API_BASE_URL}/${employer}/employee/add/${name}`);
  return response.data;
};

export const deleteEmployee = async (name) => {
  const response = await axios.delete(`${API_BASE_URL}/employee/delete/${name}`);
  return response.data;
};

export const getAccount = async (username) => {
    const response = await axios.get(`${API_BASE_URL}/account/${username}`);
    return response.data;
}


export const fetchEmployees = async (setEmployees, setEmployeeName) => {
    try {
      const employeesData = await getAllEmployees();
      console.log('Geladene Mitarbeiter:', employeesData);
      console.log(localStorage.getItem('username'));
      setEmployees(employeesData);
      if(setEmployeeName) {
        setEmployeeName(employeesData[0].name);
      }
    } catch (error) {
      console.error('Fehler beim Laden der Mitarbeiter:', error);
    }
};

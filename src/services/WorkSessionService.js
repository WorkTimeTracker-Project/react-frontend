import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;
const REST_API_BASE_URL = `${apiUrl}/api/work-sessions`;

export const listWorkSessions = async (employeeName) => {
    const response = await axios.get(`${REST_API_BASE_URL}/admin/all/${employeeName}`)
    console.log(response.data);
    console.log(response.data.filter(session => !session.startTime));
    const sortedSessions = response.data.sort((a, b) => {
        const dateTimeA = new Date(`${a.date}T${a.startTime}`);
        const dateTimeB = new Date(`${b.date}T${b.startTime}`);
        
        return dateTimeA - dateTimeB;
    });
      console.log(sortedSessions);

    return sortedSessions;
}

export const listWorkSessionsbyDate = async (employeeName, startDate, endDate) => {
    const response = await axios.get(`${REST_API_BASE_URL}/admin/date/${employeeName}/${startDate}/${endDate}`);

    const sortedSessions = response.data.sort((a, b) => {
        const dateTimeA = new Date(`${a.date}T${a.startTime}`);
        const dateTimeB = new Date(`${b.date}T${b.startTime}`);
        
        return dateTimeA - dateTimeB;
    });
      console.log(sortedSessions);

    return sortedSessions;
}

export const startWorkSession = (employeeName) => {
    return axios.post(`${REST_API_BASE_URL}/start/${employeeName}`);
}

export const endWorkSession = (employeeName) => {
    return axios.post(`${REST_API_BASE_URL}/end/${employeeName}`);
}

export const updateWorkSession = (workSession) => {
    return axios.put(`${REST_API_BASE_URL}/update/`, workSession);
}

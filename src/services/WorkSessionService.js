import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;
const REST_API_BASE_URL = `${apiUrl}/api/work-sessions`;

export const listWorkSessions = (employeeName) => {
    return axios.get(`${REST_API_BASE_URL}/admin/all/${employeeName}`);
}

export const listWorkSessionsbyDate = (employeeName, startDate, endDate) => {
    return axios.get(`${REST_API_BASE_URL}/admin/date/${employeeName}/${startDate}/${endDate}`);
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

import axios from "axios";

const REST_API_BASE_URL = 'http://192.168.2.174:8080/api/work-sessions';

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

import axios from "axios";

const API = "http://127.0.0.1:8000/api/analytics";

export const getSummary = () => axios.get(`${API}/summary`);

export const getDistribution = () => axios.get(`${API}/distribution`);

export const getModels = () => axios.get(`${API}/models`);

export const getRecent = () => axios.get(`${API}/recent`);
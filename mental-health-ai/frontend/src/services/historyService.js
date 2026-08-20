import axios from "axios";

const API = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
});

export const getHistory = async () => {
    const res = await API.get("/history");
    return res.data;
};

export const deleteHistory = async (index) => {
    const res = await API.delete(`/history/${index}`);
    return res.data;
};

export const getHistoryStats = async () => {
    const res = await API.get("/history/stats");
    return res.data;
};

export const clearHistory = async () => {
    const res = await API.delete("/history");
    return res.data;
};

export const exportHistory = async () => {
    return API.get("/history/export", {
        responseType: "blob",
    });
};
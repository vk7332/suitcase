import { api } from "../lib/api";

export const fetchCases = async () => {
    const res = await api.get("/cases");
    return res.data;
};

export const createCase = async (payload: any) => {
    const res = await api.post("/cases", payload);
    return res.data;
};

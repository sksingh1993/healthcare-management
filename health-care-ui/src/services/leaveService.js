import { removeEmptyParams } from "../utils/requestUtils";
import api from "./axios";

export const searchLeaves = async (searchRequest) => {

    const response = await api.get("/doctors/${doctorId}/leaves", {
        params: removeEmptyParams(searchRequest)
    });

    return response.data;
};

export const getLeaveById = async (id) => {

    const response = await api.get(`/doctors/${doctorId}/leaves/${id}`);

    return response.data;
};

export const createLeave = async (leaveRequest) => {

    const response = await api.post("/doctors/${doctorId}/leaves", leaveRequest);

    return response.data;
};

export const updateDoctor = async (id, leave) => {

    const response = await api.put(`/doctors/${doctorId}/leaves/${id}`, leave);

    return response.data;
};

export const deleteDoctor = async (id) => {

    const response = await api.delete(`/doctors/${id}`);

    return response.data;

};
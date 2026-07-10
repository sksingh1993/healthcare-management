import { removeEmptyParams } from "../utils/requestUtils";
import api from "./axios";

export const searchLeaves = async (doctorId,searchRequest) => {

    const response = await api.get(`/doctors/${doctorId}/leaves`, {
        params: removeEmptyParams(searchRequest)
    });

    return response.data;
};

export const getLeaveById = async (id) => {

    const response = await api.get(`/doctors/${doctorId}/leaves/${id}`);

    return response.data;
};

export const createLeave = async (doctorId,leaveRequest) => {

    const response = await api.post("/doctors/${doctorId}/leaves", leaveRequest);

    return response.data;
};

export const updateDoctor = async (id, leave) => {

    const response = await api.put(`/doctors/${doctorId}/leaves/${id}`, leave);

    return response.data;
};

export const deleteLeave = async (id) => {

    const response = await api.delete(`/leaves/${id}`);

    return response.data;

};
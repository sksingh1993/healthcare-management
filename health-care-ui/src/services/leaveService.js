import { removeEmptyParams } from "../utils/requestUtils";
import api from "./axios";

export const searchLeaves = async (doctorId,searchRequest) => {
    const request = removeEmptyParams(searchRequest)
   
    const response = await api.get(`/doctors/${doctorId}/leaves`, {
        params: removeEmptyParams(searchRequest)
    });
   
    return response.data;
};

export const getLeaveById = async (doctorId,leaveId) => {

    const response = await api.get(`/doctors/${doctorId}/leaves/${leaveId}`);

    return response.data;
};

export const createLeave = async (doctorId,leaveRequest) => {

    const response = await api.post(`/doctors/${doctorId}/leaves`, leaveRequest);

    return response.data;
};

export const updateLeave = async (doctorId,leaveId, leave) => {

    const response = await api.put(`/doctors/${doctorId}/leaves/${leaveId}`, leave);

    return response.data;
};

export const deleteLeave = async (doctorId,leaveId) => {

    const response = await api.delete(`/doctors/${doctorId}/leaves/${leaveId}`);

    return response.data;

};
import { removeEmptyParams } from "../utils/requestUtils";
import api from "./axios";

export const searchStaffs = async (searchRequest) => {
    const response = await api.get("/staffs", {
        params: removeEmptyParams(searchRequest)
    });

    return response.data;
};

export const getStaffById = async (id) => {

    const response = await api.get(`/staffs/${id}`);

    return response.data;
};

export const createStaff = async (staffRequest) => {

    const response = await api.post("/staffs", staffRequest);

    return response.data;
};

export const updateStaff = async (id, staff) => {

    const response = await api.put(`/staffs/${id}`, staff);

    return response.data;
};

export const deleteDoctor = async (id) => {

    const response = await api.delete(`/doctors/${id}`);

    return response.data;

};
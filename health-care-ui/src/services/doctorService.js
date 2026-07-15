import { removeEmptyParams } from "../utils/requestUtils";
import api from "./axios";

export const searchDoctors = async (searchRequest) => {

    const response = await api.get("/doctors", {
        params: removeEmptyParams(searchRequest)
    });

    return response.data;
};

export const getDoctorById = async (id) => {
   
    const response = await api.get(`/doctors/${id}`);

    return response.data;
};

export const createDoctor = async (doctorRequest) => {

    const response = await api.post("/doctors", doctorRequest);

    return response.data;
};

export const updateDoctor = async (id, doctor) => {

    const response = await api.put(`/doctors/${id}`, doctor);

    return response.data;
};

export const deleteDoctor = async (id) => {

    const response = await api.delete(`/doctors/${id}`);

    return response.data;

};

export const getAllDoctorsForDropdown = async () => {

    const response = await api.get("/doctors/dropdown");

    return response.data;

};
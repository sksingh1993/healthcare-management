import { removeEmptyParams } from "../utils/requestUtils";
import api from "./axios";

export const searchPatient = async (searchRequest) => {

    const response = await api.get("/patients", {
        params: removeEmptyParams(searchRequest)
    });

    return response.data;
};

export const getPatientById = async (id) => {

    const response = await api.get(`/patients/${id}`);

    return response.data;
};

export const createPatient = async (patientRequest) => {

    const response = await api.post("/patients", patientRequest);

    return response.data;
};

export const updatePatient = async (id, patient) => {

    const response = await api.put(`/patients/${id}`, patient);

    return response.data;
};

export const deletePatient = async (id) => {

    const response = await api.delete(`/patients/${id}`);

    return response.data;

};

export const getAllPatientsForDropdown = async () => {

    const response = await api.get("/patients/dropdown");

    return response.data;

};
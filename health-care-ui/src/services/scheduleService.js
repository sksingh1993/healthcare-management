import { removeEmptyParams } from "../utils/requestUtils";
import api from "./axios";

export const searchSchedulesForDoctors = async (doctorId,searchRequest) => {
    const request = removeEmptyParams(searchRequest)
   
    const response = await api.get(`/doctors/${doctorId}/schedules`, {
        params: removeEmptyParams(searchRequest)
    });
   
    return response.data;
};
export const searchSchedules = async (searchRequest) => {
    const request = removeEmptyParams(searchRequest)
   
    const response = await api.get("/schedules", {
        params: removeEmptyParams(searchRequest)
    });
   
    return response.data;
};

export const getScheduleById = async (doctorId,scheduleId) => {

    const response = await api.get(`/doctors/${doctorId}/schedules/${scheduleId}`);

    return response.data;
};

export const createSchedule = async (doctorId,scheduleRequest) => {

    const response = await api.post(`/doctors/${doctorId}/schedules`, scheduleRequest);

    return response.data;
};

export const updateSchedule = async (doctorId,scheduleId, schedule) => {

    const response = await api.put(`/doctors/${doctorId}/schedules/${scheduleId}`, schedule);

    return response.data;
};

export const deleteSchedule = async (doctorId,scheduleId) => {
    console.log("Delect api : ",doctorId,scheduleId)
    const response = await api.delete(`/doctors/${doctorId}/schedules/${scheduleId}`);

    return response.data;

};
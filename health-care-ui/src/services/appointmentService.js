import { removeEmptyParams } from "../utils/requestUtils";
import api from "./axios";

export const searchAppointments = (params) =>
    api.get("/appointments", { params });

export const getAppointment = (id) =>
    api.get(`/appointments/${id}`);

export const createAppointment = (data) =>
    api.post("/appointments", data);

export const updateAppointment = (id, data) =>
    api.put(`/appointments/${id}`, data);

export const cancelAppointment = (id) =>
    api.put(`/appointments/${id}/cancel`);

export const checkInAppointment = (id) =>
    api.put(`/appointments/${id}/check-in`);

export const completeAppointment = (id) =>
    api.put(`/appointments/${id}/complete`);

export const getAvailableSlots = (doctorId, appointmentDate) =>
    api.get(`/doctor-schedules/doctor/${doctorId}/available-slots`, {
        params: {
            appointmentDate
        }
    });
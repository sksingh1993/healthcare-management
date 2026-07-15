



import { useEffect, useState } from "react";
import { Alert, Box, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

import AppTextField from "../common/AppTextField";
import AppSelect from "../common/AppSelect";
import FormSection from "../common/FormSection";

import {
    getAllPatientsForDropdown
} from "../../services/patientService";

import {
    getAllDoctorsForDropdown,

} from "../../services/doctorService";

import {
    createAppointment,
    getAppointment,
    getAvailableSlots,
    updateAppointment
} from "../../services/appointmentService";


import { initialAppointment } from "../../pages/appointment/appointmentConstant";

import { handleApiError } from "../../utils/apiErrorHandler";
import { APPOINTMENT_TYPES } from "../../constants/appointmentType";


export default function AppointmentForm(
    {
        initialData = initialAppointment,

        editMode = false,
        appointmentId = null

    }
) {
    const [appointment, setAppointment] = useState(initialData);

    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [patients, setPatients] = useState([]);

    const [doctors, setDoctors] = useState([]);

    const [slots, setSlots] = useState([]);

    const selectedDoctor = doctors.find(
        d => d.value === appointment.doctorId);

    const selectedPatient = patients.find(
        patient => patient.value === appointment.patientId);


    useEffect(() => {

        loadPatients();

        loadDoctors();

    }, []);

    useEffect(() => {

        if (appointment.doctorId && appointment.appointmentDate) {

            loadSlots();

        }

    }, [

        appointment.doctorId,

        appointment.appointmentDate

    ]);

    useEffect(() => {

        if (editMode && appointmentId) {

            loadAppointment();

        }

    }, [editMode, appointmentId]);

    const loadAppointment = async () => {

        try {

            setLoading(true);

            const response = await getAppointment(appointmentId);

            setAppointment(response.data.data);

        } catch (error) {

            handleApiError(error);

        } finally {

            setLoading(false);

        }

    };

    /* const handleChange = (event) => {

        const { name, value } = event.target;

        setAppointment(prev => ({

            ...prev,

            [name]: value

        }));

         setErrors(prev => ({
        ...prev,
        [name]: ""
    }));

    }; */

    const handleChange = (event) => {

        const { name, value } = event.target;
        console.log(event.target);
        setAppointment(prev => {

            const updated = {
                ...prev,
                [name]: value
            };

            // Reset appointment time when doctor or date changes
            if (
                name === "doctorId" ||
                name === "appointmentDate"
            ) {
                updated.appointmentTime = "";
            }

            return updated;

        });

        // Clear validation error for the changed field
        setErrors(prev => ({
            ...prev,
            [name]: "",
            appointment: ""
        }));

    };
    const loadDoctors = async () => {

        try {

            const response = await getAllDoctorsForDropdown();

            setDoctors(response.data);
            console.log(response.data);

        } catch (error) {

            handleApiError(error);

        }

    };
    const loadPatients = async () => {

        try {

            const response = await getAllPatientsForDropdown();

            setPatients(response.data);
            console.log(response.data);

        } catch (error) {

            handleApiError(error);

        }

    };
    const loadSlots = async () => {

        try {

            const response = await getAvailableSlots(
                appointment.doctorId,
                appointment.appointmentDate
            );

            const availableSlots = response.data.data
                .filter(slot => slot.available)
                .map(slot => ({
                    value: slot.startTime,
                    label: `${slot.startTime} - ${slot.endTime}`
                }));

            setSlots(availableSlots);
            console.log(availableSlots);

        } catch (error) {

            handleApiError(error);

            setSlots([]);

        }

    };

    const handleSubmit = async () => {

        if (!validate()) {
            return;
        }

        try {

            setLoading(true);
            console.log("Appointment id :", appointmentId);
            console.log("Edit Mode:", editMode);

            if (editMode) {


                await updateAppointment(appointmentId, appointment);

            } else {

                await createAppointment(appointment);

            }

            navigate("/appointment");

        } catch (error) {

            if (error.response?.data?.validationErrors) {

                setErrors(error.response.data.validationErrors);
                console.log(errors)

                return;

            }


            handleApiError(error);

        } finally {

            setLoading(false);

        }

    };

    const validate = () => {

        const validationErrors = {};

        if (!appointment.patientId) {
            validationErrors.patientId = "Patient is required";
        }

        if (!appointment.doctorId) {
            validationErrors.doctorId = "Doctor is required";
        }

        if (!appointment.appointmentDate) {
            validationErrors.appointmentDate = "Appointment date is required";
        }

        if (!appointment.appointmentTime) {
            validationErrors.appointmentTime = "Appointment time is required";
        }

        if (!appointment.appointmentType) {
            validationErrors.appointmentType = "Appointment type is required";
        }

        setErrors(validationErrors);

        return Object.keys(validationErrors).length === 0;
    };
    return (

        <>
            {errors.appointmentExists && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {errors.appointmentExists}
                </Alert>
            )}

            {errors.doctorOnLeave && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {errors.doctorOnLeave}
                </Alert>
            )}
            <FormSection >
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 3.5 }}>
                        <AppSelect

                            label="Select Patient"

                            name="patientId"

                            value={appointment.patientId}

                            onChange={handleChange}

                            options={patients}

                            disabled={editMode}

                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 1 }}>
                        <AppTextField
                            label="Age"
                            value={selectedPatient?.age || ""}
                            disabled
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 3 }}>
                        <AppTextField
                            label="Blood Group"
                            value={selectedPatient?.bloodGroup || ""}
                            disabled
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 3 }}>
                        <AppTextField
                            label="Allergies"
                            value={selectedPatient?.allergies || ""}
                            disabled
                        />
                    </Grid>
                </Grid>
            </FormSection>
            <FormSection >
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 3 }}>
                        <AppSelect

                            label="Select Doctor"

                            name="doctorId"

                            value={appointment.doctorId}

                            onChange={handleChange}

                            options={doctors}

                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 2 }}>
                        <AppTextField
                            label="Specialization"
                            value={selectedDoctor?.specialization || ""}
                            disabled
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 2 }}>
                        <AppTextField

                            label="Choose Appointment Date"

                            type="date"

                            name="appointmentDate"

                            value={appointment.appointmentDate}

                            onChange={handleChange}

                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 2.5 }}>
                        <AppSelect

                            label="Select Appointment Time"

                            name="appointmentTime"

                            value={appointment.appointmentTime}

                            onChange={handleChange}

                            options={slots}

                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 2 }}>
                        <AppSelect

                            label="Appointment Type"

                            name="appointmentType"

                            value={appointment.appointmentType}

                            onChange={handleChange}

                            options={APPOINTMENT_TYPES}

                        />
                    </Grid>
                </Grid>
            </FormSection>

            <FormSection>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <AppTextField

                            label="Reason"

                            name="reason"

                            value={appointment.reason}

                            onChange={handleChange}

                            multiline

                            rows={3}

                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <AppTextField

                            label="Remarks"

                            name="remarks"

                            value={appointment.remarks}

                            onChange={handleChange}

                            multiline

                            rows={3}

                        />
                    </Grid>
                </Grid>
            </FormSection>
            <Button

                variant="outlined"

                onClick={() => navigate(-1)}

            >

                Cancel

            </Button>

            <Button

                variant="contained"

                onClick={handleSubmit}

                disabled={loading}

            >

                {loading ? "Saving..." : "Save"}

            </Button>
        </>

    );

}
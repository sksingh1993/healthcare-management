import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    Box,
    Button,
    CircularProgress,
    Grid,
    Stack
} from "@mui/material";

import PageHeader from "../../components/common/PageHeader";
import FormSection from "../../components/common/FormSection";
import DetailItem from "../../components/common/DetailItem";

import { getDoctorById } from "../../services/doctorService";
import { handleApiError } from "../../utils/apiErrorHandler";


export default function ViewDoctor() {

    const { doctorId } = useParams();

    const navigate = useNavigate();

    const [doctor, setDoctor] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadDoctor();
    }, []);

    const loadDoctor = async () => {

        try {

            const response = await getDoctorById(doctorId);

            setDoctor(response.data);

        } catch (error) {

            handleApiError(error);

            navigate("/doctor");

        } finally {

            setLoading(false);

        }
    };

    if (loading) {

        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    mt: 5
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    return (

        <>

            {/* <PageHeader title="Doctor Details" /> */}
            <PageHeader
                title="Doctor Details"
                actions={
                    <Stack direction="row" spacing={1}>

                        <Button
                            variant="outlined"
                            onClick={() => navigate(`/doctor/${doctorId}/schedule`)}
                        >
                            Schedule
                        </Button>

                        <Button
                            variant="outlined"
                            onClick={() => navigate(`/doctor/${doctorId}/leave`)}
                        >
                            Leaves
                        </Button>

                        <Button
                            variant="outlined"
                            onClick={() => navigate(`/doctor/${doctorId}/appointment`)}
                        >
                            Appointments
                        </Button>

                        <Button
                            variant="contained"
                            onClick={() => navigate(`/doctor/edit/${doctorId}`)}
                        >
                            Edit
                        </Button>

                    </Stack>
                }
            />

            <FormSection title="Professional Information">

                <Grid container spacing={2}>
                    <Grid size={{ xs: 10, md: 2.4 }}>
                        <DetailItem
                            label="Specialization"
                            value={doctor.specialization}
                        />
                    </Grid>
                    <Grid size={{ xs: 10, md: 1.5 }}>
                        <DetailItem
                            label="Qualification"
                            value={doctor.qualification}
                        />
                    </Grid>
                    <Grid size={{ xs: 10, md: 2 }}>
                        <DetailItem
                            label="Experience"
                            value={`${doctor.experienceYears} Years`}
                        />
                    </Grid>
                    <Grid size={{ xs: 10, md: 3 }}>
                        <DetailItem
                            label="Consultation Fee"
                            value={`₹ ${doctor.consultationFee}`}
                        />
                    </Grid>
                    <Grid size={{ xs: 10, md: 3 }}>
                        <DetailItem
                            label="Registration Number"
                            value={doctor.registrationNumber}
                        />
                    </Grid>

                </Grid>

            </FormSection>
            <FormSection title="Personal Information">

                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 3 }}>
                        <DetailItem
                            label="Doctor Code"
                            value={doctor.doctorCode}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 2 }}>
                        <DetailItem
                            label="First Name"
                            value={doctor.firstName}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 2 }}>
                        <DetailItem
                            label="Last Name"
                            value={doctor.lastName}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 2 }}>
                        <DetailItem
                            label="Gender"
                            value={doctor.gender}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 1 }}>
                        <DetailItem
                            label="Age"
                            value={doctor.age}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 2 }}>
                        <DetailItem
                            label="Status"
                            value={doctor.active ? "Active" : "Inactive"}
                        />
                    </Grid>
                </Grid>



            </FormSection>
            <FormSection title="Contact Details">

                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 2 }}>
                        <DetailItem
                            label="Mobile"
                            value={doctor.mobile}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <DetailItem
                            label="Email"
                            value={doctor.email}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <DetailItem
                            label="Address"
                            value={doctor.address}
                        />
                    </Grid>
                </Grid>

            </FormSection>

            <Box
                sx={{
                    mt: 3,
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: 2
                }}
            >

                <Button
                    variant="outlined"
                    onClick={() => navigate("/doctor")}
                >
                    Back
                </Button>

            </Box>

        </>

    );
}
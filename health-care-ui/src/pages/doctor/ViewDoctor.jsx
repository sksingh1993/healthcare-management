import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    Box,
    Button,
    CircularProgress,
    Grid
} from "@mui/material";

import PageHeader from "../../components/common/PageHeader";
import FormSection from "../../components/common/FormSection";
import DetailItem from "../../components/common/DetailItem";

import { getDoctorById } from "../../services/doctorService";
import { handleApiError } from "../../utils/apiErrorHandler";

export default function ViewDoctor() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [doctor, setDoctor] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadDoctor();
    }, []);

    const loadDoctor = async () => {

        try {

            const response = await getDoctorById(id);

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
                buttonText="Edit"
                onButtonClick={() => navigate(`/doctor/edit/${id}`)}
            />

            <FormSection title="Personal Information">

                <Grid container spacing={2}>

                    <DetailItem
                        label="Doctor Code"
                        value={doctor.doctorCode}
                    />

                    <DetailItem
                        label="First Name"
                        value={doctor.firstName}
                    />

                    <DetailItem
                        label="Last Name"
                        value={doctor.lastName}
                    />

                    <DetailItem
                        label="Gender"
                        value={doctor.gender}
                    />

                    <DetailItem
                        label="Age"
                        value={doctor.age}
                    />

                    <DetailItem
                        label="Mobile"
                        value={doctor.mobile}
                    />

                    <DetailItem
                        label="Email"
                        value={doctor.email}
                    />

                    <DetailItem
                        label="Status"
                        value={doctor.active ? "Active" : "Inactive"}
                    />

                </Grid>

            </FormSection>

            <FormSection title="Professional Information">

                <Grid container spacing={2}>

                    <DetailItem
                        label="Specialization"
                        value={doctor.specialization}
                    />

                    <DetailItem
                        label="Qualification"
                        value={doctor.qualification}
                    />

                    <DetailItem
                        label="Experience"
                        value={`${doctor.experienceYears} Years`}
                    />

                    <DetailItem
                        label="Consultation Fee"
                        value={`₹ ${doctor.consultationFee}`}
                    />

                    <DetailItem
                        label="Registration Number"
                        value={doctor.registrationNumber}
                    />

                </Grid>

            </FormSection>

            <FormSection title="Address">

                <Grid container spacing={2}>

                    <DetailItem
                        label="Address"
                        value={doctor.address}
                    />

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
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

import { getPatientById } from "../../services/patientService";
import { handleApiError } from "../../utils/apiErrorHandler";


export default function ViewPatient() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [patient, setPatient] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadPatient();
    }, []);

    const loadPatient = async () => {

        try {

            const response = await getPatientById(id);

            setPatient(response.data);

        } catch (error) {

            handleApiError(error);

            navigate("/patient");

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

            <PageHeader
                title="Patient Details"
                actions={
                    <Stack direction="row" spacing={1}>
                        <Button
                            variant="contained"
                            onClick={() => navigate(`/patient/edit/${id}`)}
                        >
                            Edit
                        </Button>

                    </Stack>
                }
            />


            <FormSection title="Personal Information">

                <Grid container spacing={2}>

                    <DetailItem
                        label="Patient Code"
                        value={patient.patientCode}
                    />

                    <DetailItem
                        label="First Name"
                        value={patient.firstName}
                    />

                    <DetailItem
                        label="Last Name"
                        value={patient.lastName}
                    />

                    <DetailItem
                        label="Gender"
                        value={patient.gender}
                    />

                    <DetailItem
                        label="Age"
                        value={patient.age}
                    />

                    <DetailItem
                        label="Mobile"
                        value={patient.mobile}
                    />

                    <DetailItem
                        label="Email"
                        value={patient.email}
                    />

                    <DetailItem
                        label="Bood Group"
                        value={patient.bloodGroup}
                    />

                    <DetailItem
                        label="Status"
                        value={patient.active ? "Active" : "Inactive"}
                    />

                </Grid>

            </FormSection>

            <FormSection title="Health Information">

                <Grid container spacing={2}>

                    <DetailItem
                        label="Allergies"
                        value={patient.allergies}
                    />
                </Grid>

            </FormSection>

            <FormSection title="Address">

                <Grid container spacing={2}>

                    <DetailItem
                        label="Address"
                        value={patient.address}
                    />

                </Grid>
                <Grid container spacing={2}>

                    <DetailItem
                        label="Emergency Contact Name"
                        value={patient.emergencyContactName}
                    />

                </Grid>
                <Grid container spacing={2}>

                    <DetailItem
                        label="Emergency Contact Number"
                        value={patient.emergencyContactNumber}
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
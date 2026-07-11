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
                    <Grid size={{ xs: 10, md: 2 }}>
                        <DetailItem
                            label="Patient Code"
                            value={patient.patientCode}
                        />
                    </Grid>
                    <Grid size={{ xs: 10, md: 2 }}>
                        <DetailItem
                            label="First Name"
                            value={patient.firstName}
                        />
                    </Grid>
                    <Grid size={{ xs: 10, md: 2 }}>
                        <DetailItem
                            label="Last Name"
                            value={patient.lastName}
                        />
                    </Grid>
                    <Grid size={{ xs: 10, md: 2 }}>
                        <DetailItem
                            label="Gender"
                            value={patient.gender}
                        />
                    </Grid>
                    <Grid size={{ xs: 10, md: 2 }}>
                        <DetailItem
                            label="Age"
                            value={patient.age}
                        />
                    </Grid>


                    <Grid size={{ xs: 10, md: 2 }}>
                        <DetailItem
                            label="Status"
                            value={patient.active ? "Active" : "Inactive"}
                        />
                    </Grid>


                </Grid>

            </FormSection>

            <FormSection title="Health Information">

                <Grid container spacing={2}>
                    <Grid size={{ xs: 10, md: 2 }}>
                        <DetailItem
                            label="Allergies"
                            value={patient.allergies}
                        />
                    </Grid>
                    <Grid size={{ xs: 10, md: 2 }}>
                        <DetailItem
                            label="Bood Group"
                            value={patient.bloodGroup}
                        />
                    </Grid>
                </Grid>
            </FormSection>

            <FormSection title="Contact Details">

                <Grid container spacing={2}>
                    <Grid size={{ xs: 10, md: 1.5 }}>
                        <DetailItem
                            label="Mobile"
                            value={patient.mobile}
                        />
                    </Grid>
                    <Grid size={{ xs: 10, md: 2 }}>
                        <DetailItem
                            label="Email"
                            value={patient.email}
                        />
                    </Grid>
                    <Grid size={{ xs: 10, md: 3 }}>
                        <DetailItem
                            label="Address"
                            value={patient.address}
                        />
                    </Grid>
                



                <Grid size={{ xs: 10, md: 2.5 }}>
                    <DetailItem
                        label="Emergency Contact Name"
                        value={patient.emergencyContactName}
                    />
                </Grid>


                <Grid size={{ xs: 10, md: 2.5 }}>
                    <DetailItem
                        label="Emergency Contact Number"
                        value={patient.emergencyContactNumber}
                    />
                </Grid>
            </Grid>

        </FormSection >

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
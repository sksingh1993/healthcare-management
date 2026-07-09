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


import { handleApiError } from "../../utils/apiErrorHandler";
import { getStaffById } from "../../services/staffService";

export default function ViewStaff() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [staff, setStaff] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadStaff();
    }, []);

    const loadStaff = async () => {

        try {

            const response = await getStaffById(id);

            setStaff(response.data);
            console.log(response)

        } catch (error) {

            handleApiError(error);

            navigate("/staff");

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
                title="Staff Details"
                buttonText="Edit"
                onButtonClick={() => navigate(`/staff/edit/${id}`)}
            />

            <FormSection title="Personal Information">

                <Grid container spacing={2}>

                    <DetailItem
                        label="Employee Id"
                        value={staff.employeeCode}
                    />

                    <DetailItem
                        label="First Name"
                        value={staff.firstName}
                    />

                    <DetailItem
                        label="Last Name"
                        value={staff.lastName}
                    />

                    <DetailItem
                        label="Gender"
                        value={staff.gender}
                    />

                    <DetailItem
                        label="Age"
                        value={staff.age}
                    />

                    <DetailItem
                        label="Date of Birth"
                        value={staff.dateOfBirth}
                    />


                    <DetailItem
                        label="Mobile"
                        value={staff.mobile}
                    />

                    <DetailItem
                        label="Email"
                        value={staff.email}
                    />

                    <DetailItem
                        label="Status"
                        value={staff.active ? "Active" : "Inactive"}
                    />

                </Grid>

            </FormSection>

            <FormSection title="Professional Information">

                <Grid container spacing={2}>

                    <DetailItem
                        label="department"
                        value={staff.department}
                    />

                    <DetailItem
                        label="Designation"
                        value={staff.designation}
                    />

                    <DetailItem
                        label="JoiningDate"
                        value={staff.joiningDate}
                    />
                    

                </Grid>

            </FormSection>

            <FormSection title="Address">

                <Grid container spacing={2}>

                    <DetailItem
                        label="Address"
                        value={staff.address}
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
                    onClick={() => navigate("/staff")}
                >
                    Back
                </Button>

            </Box>

        </>

    );
}
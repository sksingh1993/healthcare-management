// MUI
import {
    Box,
    Button,
    Grid,
    Typography
} from "@mui/material";

// Components
import AppSelect from "../../components/common/AppSelect";
import AppTextField from "../../components/common/AppTextField";
import FormSection from "../../components/common/FormSection";

// Constants
import { GENDERS } from "../../constants/gender";
import { DEPARTMENT } from "../../constants/department";
import { ROLE_TYPE } from "../../constants/roleType";

export default function StaffEditForm({

    title,
    staff,

    setStaff,
    setErrors,

    errors,

    loading = false,

    onSubmit,

    onCancel,

    submitButtonText

}) {

    const handleChange = (event) => {

        const { name, value } = event.target;

        setStaff(prev => ({
            ...prev,
            [name]: value
        }));

        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ""
            }));
        }
    };
    console.log(staff)
    return (

        <>

            <Typography
                variant="h4"
                sx={{ mb: 3 }}
            >
                {title}
            </Typography>

            <FormSection title="Personal Information">

                <Grid container spacing={2}>
                    {/* <Grid size={{ xs: 12, md: 6 }}>
                        <AppTextField

                            label="Full Name"

                            name="fullName"

                            value={staff.fullName}

                            onChange={handleChange}

                            error={errors.fullName}

                            helperText={errors.fullName}

                            required

                            InputProps={{ readOnly: true }}

                        />
                    </Grid> */}

                    <Grid size={{ xs: 12, md: 6 }}>
                        <AppTextField

                            label="First Name"

                            name="firstName"

                            value={staff.firstName}

                            onChange={handleChange}

                            error={errors.firstName}

                            helperText={errors.firstName}

                            required

                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <AppTextField

                            label="Last Name"

                            name="lastName"

                            value={staff.lastName}

                            onChange={handleChange}

                            error={errors.lastName}

                            helperText={errors.lastName}

                            required

                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <AppTextField

                            label="Mobile"

                            name="mobile"

                            type="number"

                            value={staff.mobile}

                            onChange={handleChange}

                            error={errors.mobile}

                            helperText={errors.mobile}

                            required

                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <AppTextField

                            label="Email"

                            name="email"

                            value={staff.email}

                            onChange={handleChange}

                            error={errors.email}

                            helperText={errors.email}

                            required

                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>

                        <AppSelect
                            label="Gender"
                            name="gender"
                            value={staff.gender}
                            onChange={handleChange}
                            options={GENDERS}
                            error={errors.gender}
                            helperText={errors.gender}
                            required
                        />

                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>

                        <AppTextField
                            label="Date of Birth"
                            name="dateOfBirth"
                            type="date"
                            value={staff.dateOfBirth || ""}
                            onChange={handleChange}
                            error={errors.dateOfBirth}
                            helperText={errors.dateOfBirth}
                            required
                        />

                    </Grid>

                </Grid>
            </FormSection>
            <FormSection title="Professional Information">

                <Grid container spacing={2}>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <AppSelect

                            label="Department"

                            name="department"

                            value={staff.department}

                            onChange={handleChange}

                            options={DEPARTMENT}

                            error={errors.department}

                            helperText={errors.department}

                            required

                        />

                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>

                        <AppSelect

                            label="Department"

                            name="designation"

                            value={staff.designation}

                            onChange={handleChange}

                            options={ROLE_TYPE}

                            error={errors.designation}

                            helperText={errors.designation}

                            required

                        />

                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>

                        <AppTextField

                            label="Date of joining"

                            name="joiningDate"

                            type="date"

                            value={staff.joiningDate}

                            onChange={handleChange}

                            error={errors.joiningDate}

                            helperText={errors.joiningDate}

                            required

                        />

                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <AppTextField
                            label="Address"
                            name="address"
                            value={staff.address}
                            onChange={handleChange}
                            error={errors.address}
                            helperText={errors.address}
                            multiline
                            rows={3}
                            required
                        />
                    </Grid>
                    
                </Grid>

            </FormSection>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: 2,
                    mt: 3
                }}
            >
                <Button
                    variant="outlined"
                    onClick={onCancel}
                >
                    Cancel
                </Button>

                <Button
                    variant="contained"
                    type="button"
                    disabled={loading}
                    onClick={onSubmit}
                >
                    {loading ? "Saving..." : submitButtonText}
                </Button>
            </Box>



        </>

    );

}
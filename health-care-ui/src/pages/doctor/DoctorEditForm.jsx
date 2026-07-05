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
import { SPECIALIZATIONS } from "../../constants/specialization";

export default function DoctorEditForm({

    title,
    doctor,

    setDoctor,
    setErrors,

    errors,

    loading = false,

    onSubmit,

    onCancel,

    submitButtonText

}) {

    const handleChange = (event) => {

        const { name, value } = event.target;

        setDoctor(prev => ({
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
                    <Grid size={{ xs: 12, md: 6 }}>
                        <AppTextField

                            label="Full Name"

                            name="fullName"

                            value={doctor.fullName}

                            onChange={handleChange}

                            error={errors.fullName}

                            helperText={errors.fullName}

                            required

                            InputProps={{ readOnly: true }}

                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <AppTextField

                            label="First Name"

                            name="firstName"

                            value={doctor.firstName}

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

                            value={doctor.lastName}

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

                            value={doctor.mobile}

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

                            value={doctor.email}

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
                            value={doctor.gender}
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
                            value={doctor.dateOfBirth || ""}
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

                            label="Specialization"

                            name="specialization"

                            value={doctor.specialization}

                            onChange={handleChange}

                            options={SPECIALIZATIONS}

                            error={errors.specialization}

                            helperText={errors.specialization}

                            required

                        />

                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>

                        <AppTextField

                            label="Qualification"

                            name="qualification"

                            value={doctor.qualification}

                            onChange={handleChange}

                            error={errors.qualification}

                            helperText={errors.qualification}

                            required

                        />

                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>

                        <AppTextField

                            label="Experience Years"

                            name="experienceYears"

                            type="number"

                            value={doctor.experienceYears}

                            onChange={handleChange}

                            error={errors.experienceYears}

                            helperText={errors.experienceYears}

                            required

                        />

                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>

                        <AppTextField

                            label="Consultation Fee"

                            name="consultationFee"

                            type="number"

                            value={doctor.consultationFee}

                            onChange={handleChange}

                            error={errors.consultationFee}

                            helperText={errors.consultationFee}

                            required

                        />

                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>

                        <AppTextField

                            label="Registration Number"

                            name="registrationNumber"

                            value={doctor.registrationNumber}

                            onChange={handleChange}

                            error={errors.registrationNumber}

                            helperText={errors.registrationNumber}

                            required

                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <AppTextField
                            label="Address"
                            name="address"
                            value={doctor.address}
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
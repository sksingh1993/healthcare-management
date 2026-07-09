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
import { BLOOD_GROUP } from "../../constants/bloodGroup";

export default function PatientEditForm({

    title,
    patient,

    setPatient,
    setErrors,

    errors,

    loading = false,

    onSubmit,

    onCancel,

    submitButtonText

}) {

    const handleChange = (event) => {

        const { name, value } = event.target;

        setPatient(prev => ({
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

                            value={patient.fullName}

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

                            value={patient.firstName}

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

                            value={patient.lastName}

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

                            value={patient.mobile}

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

                            value={patient.email}

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
                            value={patient.gender}
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
                            value={patient.dateOfBirth || ""}
                            onChange={handleChange}
                            error={errors.dateOfBirth}
                            helperText={errors.dateOfBirth}
                            required
                        />

                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>

                        <AppTextField

                            label="Emergency Contact Name"

                            name="emergencyContactName"

                            value={patient.emergencyContactName}

                            onChange={handleChange}

                            error={errors.emergencyContactName}

                            helperText={errors.emergencyContactName}

                            required

                        />

                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>

                        <AppTextField

                            label="Emergent Contact Number"

                            name="emergencyContactNumber"

                            type="number"

                            value={patient.emergencyContactNumber}

                            onChange={handleChange}

                            error={errors.emergencyContactNumber}

                            helperText={errors.emergencyContactNumber}

                            required

                        />

                    </Grid>



                    <Grid size={{ xs: 12, md: 6 }}>
                        <AppTextField
                            label="Address"
                            name="address"
                            value={patient.address}
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
            <FormSection title="Health Information">
            
                            <Grid container spacing={2}>
            
                                <Grid size={{ xs: 12, md: 6 }}>
            
                                    <AppSelect
                                        label="BloodGroup"
            
                                        name="bloodGroup"
            
                                        value={patient.bloodGroup}
            
                                        onChange={handleChange}    
                                        options={BLOOD_GROUP}                        
            
                                        error={errors.specialization}
            
                                        helperText={errors.specialization}
            
                                        required
            
                                    />
            
                                </Grid>
                                <Grid size={{ xs: 12, md: 6 }}>
            
                                    <AppTextField
            
                                        label="Allergies"
            
                                        name="allergies"
            
                                        value={patient.allergies}
            
                                        onChange={handleChange}
            
                                        error={errors.qualification}
            
                                        helperText={errors.qualification}
            
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
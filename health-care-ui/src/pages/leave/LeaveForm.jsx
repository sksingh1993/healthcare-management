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
import { LEAVE_TYPE } from "../../constants/leaveType";

export default function LeaveForm({

    title,
    leave,

    setLeave,
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
                            label="From Date"
                            name="fromDate"
                            type="date"
                            value={leave.fromDate || ""}
                            onChange={handleChange}
                            error={errors.fromDate}
                            helperText={errors.fromDate}
                            required
                        />

                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>

                        <AppTextField
                            label="To Date"
                            name="toDate"
                            type="date"
                            value={leave.toDate || ""}
                            onChange={handleChange}
                            error={errors.toDate}
                            helperText={errors.toDate}
                            required
                        />

                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>

                        <AppSelect
                            label="Leave Type"
                            name="leaveType"
                            value={leave.leaveType}
                            onChange={handleChange}
                            options={LEAVE_TYPE}
                            error={errors.leaveType}
                            helperText={errors.leaveType}
                            required
                        />

                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>

                        <AppTextField

                            label="Reason"

                            name="reason"

                            value={leave.reason}

                            onChange={handleChange}

                            error={errors.reason}

                            helperText={errors.reason}

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
// MUI
import {
    Alert,
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
import { DAY_OF_WEEK } from "../../constants/dayOfWeek";

export default function ScheduleForm({

    title,
    schedule,

    setSchedule,
    setErrors,

    errors,

    loading = false,

    onSubmit,

    onCancel,

    submitButtonText

}) {

    const handleChange = (event) => {

        const { name, value } = event.target;

        setSchedule(prev => ({
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
            {errors.schedule && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {errors.schedule}
                </Alert>
            )}

            <FormSection title="Schedule Information">

                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 6 }}>

                        <AppSelect
                            label="Day Of Week"
                            name="dayOfWeek"
                            value={schedule.dayOfWeek}
                            onChange={handleChange}
                            options={DAY_OF_WEEK}
                            error={errors.dayOfWeek}
                            helperText={errors.dayOfWeek}
                            required
                        />

                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>

                        <AppTextField
                            label="Slot Duration"
                            name="slotDuration"
                            type="number"
                            value={schedule.slotDuration || ""}
                            onChange={handleChange}
                            error={errors.slotDuration}
                            helperText={errors.slotDuration}
                            required
                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <AppTextField
                            label="Start Time"
                            name="startTime"
                            type="time"
                            value={schedule.startTime || ""}
                            onChange={handleChange}
                            error={errors.startTime}
                            helperText={errors.startTime}
                            required
                        />

                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>

                        <AppTextField
                            label="End Time"
                            name="endTime"
                            type="time"
                            value={schedule.endTime || ""}
                            onChange={handleChange}
                            error={errors.endTime}
                            helperText={errors.endTime}
                            required
                        />

                    </Grid>


                    <Grid size={{ xs: 12, md: 6 }}>

                        <AppTextField

                            label="Consultation Limit"

                            name="consultationLimit"

                            value={schedule.consultationLimit}

                            onChange={handleChange}

                            error={errors.consultationLimit}

                            helperText={errors.consultationLimit}

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
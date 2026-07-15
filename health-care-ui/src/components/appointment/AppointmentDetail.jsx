import { Box, Button, Chip, Grid } from "@mui/material";

import FormSection from "../common/FormSection";
import DetailItem from "../common/DetailItem";

export default function AppointmentDetail({

    appointment,

    onEdit,

    onBack,

    onCancel,

    onCheckIn,

    onComplete

}) {

    const getStatusColor = (status) => {

        switch (status) {

            case "BOOKED":
                return "primary";

            case "CHECKED_IN":
                return "warning";

            case "COMPLETED":
                return "success";

            case "CANCELLED":
                return "error";

            default:
                return "default";
        }

    };

    if (!appointment) {

        return null;

    }

    return (

        <>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: 2,
                    mb: 2
                }}
            >

                {appointment.status === "BOOKED" && (

                    <>
                        <Button
                            variant="contained"
                            color="warning"
                            onClick={onEdit}
                        >
                            Edit
                        </Button>

                        <Button
                            variant="contained"
                            color="error"
                            onClick={onCancel}
                        >
                            Cancel
                        </Button>

                        <Button
                            variant="contained"
                            color="success"
                            onClick={onCheckIn}
                        >
                            Check In
                        </Button>
                    </>

                )}

                {appointment.status === "CHECKED_IN" && (

                    <Button
                        variant="contained"
                        color="success"
                        onClick={onComplete}
                    >
                        Complete
                    </Button>

                )}

                <Button
                    variant="outlined"
                    onClick={onBack}
                >
                    Back
                </Button>

            </Box>

            <FormSection title="Appointment Information">

                <Grid container spacing={2}>

                    <Grid size={{ xs: 12, md: 4 }}>
                        <DetailItem
                            label="Appointment Code"
                            value={appointment.appointmentCode}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                        <DetailItem
                            label="Appointment Date"
                            value={appointment.appointmentDate}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                        <DetailItem
                            label="Appointment Time"
                            value={`${appointment.appointmentTime} - ${appointment.appointmentEndTime}`}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                        <DetailItem
                            label="Appointment Type"
                            value={appointment.appointmentType}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>

                        <Box>

                            <strong>Status</strong>

                            <br />

                            <Chip

                                label={appointment.status}

                                color={getStatusColor(appointment.status)}

                            />

                        </Box>

                    </Grid>

                </Grid>

            </FormSection>

            <FormSection title="Patient Information">

                <Grid container spacing={2}>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <DetailItem
                            label="Patient Code"
                            value={appointment.patientCode}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <DetailItem
                            label="Patient Name"
                            value={appointment.patientName}
                        />
                    </Grid>

                </Grid>

            </FormSection>

            <FormSection title="Doctor Information">

                <Grid container spacing={2}>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <DetailItem
                            label="Doctor Code"
                            value={appointment.doctorCode}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <DetailItem
                            label="Doctor Name"
                            value={appointment.doctorName}
                        />
                    </Grid>

                </Grid>

            </FormSection>

            <FormSection title="Additional Information">

                <Grid container spacing={2}>

                    <Grid size={{ xs: 12 }}>
                        <DetailItem
                            label="Reason"
                            value={appointment.reason || "-"}
                        />
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                        <DetailItem
                            label="Remarks"
                            value={appointment.remarks || "-"}
                        />
                    </Grid>

                </Grid>

            </FormSection>

        </>

    );

}
import { Grid, Button } from "@mui/material";

import AppTextField from "../common/AppTextField";
import AppSelect from "../common/AppSelect";
import FormSection from "../common/FormSection";

import { APPOINTMENT_STATUS } from "../../constants/appointmentStatus";

export default function AppointmentSearch({

    search,

    onChange,

    onSearch,

    onReset

}) {

    return (

        <FormSection title="Search Appointment">

            <Grid container spacing={2}>

                <Grid size={{ xs: 12, md: 3 }}>

                    <AppTextField
                        label="Patient Id"
                        name="patientId"
                        value={search.patientId}
                        onChange={onChange}
                    />

                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>

                    <AppTextField
                        label="Doctor Id"
                        name="doctorId"
                        value={search.doctorId}
                        onChange={onChange}
                    />

                </Grid>

                <Grid size={{ xs: 12, md: 2 }}>

                    <AppSelect
                        label="Status"
                        name="status"
                        value={search.status}
                        onChange={onChange}
                        options={APPOINTMENT_STATUS}
                    />

                </Grid>

                <Grid size={{ xs: 12, md: 2 }}>

                    <AppTextField
                        label="From Date"
                        type="date"
                        name="fromDate"
                        value={search.fromDate}
                        onChange={onChange}
                    />

                </Grid>

                <Grid size={{ xs: 12, md: 2 }}>

                    <AppTextField
                        label="To Date"
                        type="date"
                        name="toDate"
                        value={search.toDate}
                        onChange={onChange}
                    />

                </Grid>

                <Grid size={12}>

                    <Button
                        variant="contained"
                        onClick={onSearch}
                    >
                        Search
                    </Button>

                    <Button
                        variant="outlined"
                        onClick={onReset}
                        sx={{ ml: 2 }}
                    >
                        Reset
                    </Button>

                </Grid>

            </Grid>

        </FormSection>

    );

}
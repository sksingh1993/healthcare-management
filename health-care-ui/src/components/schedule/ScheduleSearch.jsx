import {
    Grid,
    Button
} from "@mui/material";

import AppTextField from "../common/AppTextField";
import AppSelect from "../common/AppSelect";
import { DAY_OF_WEEK } from "../../constants/dayOfWeek";

export default function ScheduleSearch({

    search,

    doctorId,

    onChange,

    onSearch,

    onReset

}) {

    return (

        <Grid
            container
            spacing={2}
            sx={{ mb: 3 }}
        >

           {!doctorId && <Grid size={{ xs: 12, md: 3 }}>
                <AppTextField
                    label="Doctor Name"
                    name="doctorName"
                    value={search.doctorName}
                    onChange={onChange}
                />
            </Grid>}

{/*             <Grid size={{ xs: 12, md: 3 }}>
                <AppTextField
                    label="From Date"
                    name="dayOfWeek"
                    type="date"
                    value={search.dayOfWeek}
                    onChange={onChange}
                />
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
                <AppTextField
                    label="To Date"
                    name="toDate"
                    type="date"
                    value={search.toDate}
                    onChange={onChange}
                />
            </Grid> */}

            <Grid size={{ xs: 12, md: 3 }}>
                <AppSelect
                    label="Day Of Week"
                    name="dayOfWeek"
                    value={search.dayOfWeek}
                    options={DAY_OF_WEEK}
                    onChange={onChange}
                />
            </Grid>

            <Grid
                size={{ xs: 12, md: 3 }}
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1
                }}
            >

                <Button
                    variant="contained"
                    onClick={onSearch}
                >
                    Search
                </Button>

                <Button
                    variant="outlined"
                    onClick={onReset}
                >
                    Reset
                </Button>

            </Grid>

        </Grid>

    );

}
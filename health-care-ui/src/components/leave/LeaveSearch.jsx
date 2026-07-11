import {
    Grid,
    Button
} from "@mui/material";

import AppTextField from "../common/AppTextField";
import AppSelect from "../common/AppSelect";
import { LEAVE_TYPE } from "../../constants/leaveType";

export default function LeaveSearch({

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
                    label="Doctor Code"
                    name="doctorCode"
                    value={search.doctorCode}
                    onChange={onChange}
                />
            </Grid>}

            <Grid size={{ xs: 12, md: 3 }}>
                <AppTextField
                    label="From Date"
                    name="fromDate"
                    type="date"
                    value={search.fromDate}
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
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
                <AppSelect
                    label="leaveType"
                    name="leaveType"
                    value={search.leaveType}
                    options={LEAVE_TYPE}
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
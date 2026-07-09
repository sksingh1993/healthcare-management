import {
    Grid,
    Button
} from "@mui/material";

import AppTextField from "../common/AppTextField";
import AppSelect from "../common/AppSelect";
import { SPECIALIZATIONS } from "../../constants/specialization";
import { ROLE_TYPE } from "../../constants/roleType";
import { DEPARTMENT } from "../../constants/department";

export default function StaffSearch({

    search,

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

            <Grid size={{ xs: 12, md: 3 }}>
                <AppTextField
                    label="Employee Code"
                    name="employeeCode"
                    value={search.employeeCode}
                    onChange={onChange}
                />
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
                <AppTextField
                    label="Employee Name"
                    name="firstName"
                    value={search.firstName}
                    onChange={onChange}
                />
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
                <AppSelect
                    label="Department"
                    name="department"
                    value={search.department}
                    options={DEPARTMENT}
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
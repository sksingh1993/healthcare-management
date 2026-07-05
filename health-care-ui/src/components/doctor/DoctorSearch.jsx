import {
    Grid,
    Button
} from "@mui/material";

import AppTextField from "../common/AppTextField";
import AppSelect from "../common/AppSelect";
import { SPECIALIZATIONS } from "../../constants/specialization";

export default function DoctorSearch({

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
                    label="Doctor Code"
                    name="doctorCode"
                    value={search.doctorCode}
                    onChange={onChange}
                />
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
                <AppTextField
                    label="Doctor Name"
                    name="name"
                    value={search.name}
                    onChange={onChange}
                />
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
                <AppSelect
                    label="Specialization"
                    name="specialization"
                    value={search.specialization}
                    options={SPECIALIZATIONS}
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
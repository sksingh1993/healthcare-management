import { Button, Grid } from "@mui/material";
import AppTextField from "../common/AppTextField";

function PatientSearch({
    search,
    onChange,
    onSearch,
    onReset
}){
    return(
        <Grid container spacing={2} sx={{mb:3}}>
            <Grid size={{xs: 12,md: 3}}>
                <AppTextField 
                    label="Patient Code"
                    name="patientCode"
                    value={search.patientCode}
                    onChange={onChange}
                />
            </Grid>

            <Grid size={{xs: 12,md: 3}}>
                <AppTextField 
                    label="Patient Name"
                    name="name"
                    value={search.name}
                    onChange={onChange}
                />
            </Grid>

            <Grid size={{xs: 12,md: 3}}>
                <AppTextField 
                    label="Patient Phone"
                    name="mobile"
                    value={search.mobile}
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
    )
}
export default PatientSearch;
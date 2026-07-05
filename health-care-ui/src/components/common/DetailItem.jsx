import { Grid, Typography } from "@mui/material";

export default function DetailItem({

    label,

    value

}) {

    return (

        <Grid size={{ xs: 12, md: 6 }}>

            <Typography
                variant="body2"
                color="text.secondary"
            >
                {label}
            </Typography>

            <Typography variant="body1">

                {value || "-"}

            </Typography>

        </Grid>

    );

}
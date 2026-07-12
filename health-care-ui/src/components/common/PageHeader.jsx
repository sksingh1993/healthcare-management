import { Box, Typography } from "@mui/material";

export default function PageHeader({
    title,
    actions
}) {

    return (

        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3
            }}
        >

            <Typography
                variant="h4"
                fontWeight="bold"
            >
                {title}
            </Typography>

            {actions}

        </Box>

    );

}
import { Box, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function PageHeader({
    title,
    buttonText,
    onButtonClick,
    showButton = true
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

            {
                showButton &&

                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={onButtonClick}
                >
                    {buttonText}
                </Button>
            }

        </Box>

    );

}
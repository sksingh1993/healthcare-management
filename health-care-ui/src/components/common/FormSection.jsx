import { Card, CardContent, Typography } from "@mui/material";

export default function FormSection({ title, children }) {

    return (

        <Card sx={{ mb: 3 }}>

            <CardContent>

                <Typography
                    variant="h6"
                    sx={{ mb: 2 }}
                >
                    {title}
                </Typography>

                {children}

            </CardContent>

        </Card>

    );

}
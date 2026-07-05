import {
    Avatar,
    Box,
    Button,
    Container,
    Paper,
    Typography,
    Alert
} from "@mui/material";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import AppTextField from "../common/AppTextField";

export default function LoginForm({

    credentials,

    setCredentials,

    errors,

    setErrors,

    loading,

    onSubmit

}) {

    const handleChange = (event) => {

        const { name, value } = event.target;

        setCredentials(prev => ({
            ...prev,
            [name]: value
        }));

        if (errors[name]) {

            setErrors(prev => ({
                ...prev,
                [name]: ""
            }));

        }

    };

    return (

        <Container
            maxWidth="sm"
            sx={{
                height: "100vh",
                display: "flex",
                alignItems: "center"
            }}
        >

            <Paper
                elevation={6}
                sx={{
                    p: 5,
                    width: "100%",
                    borderRadius: 3
                }}
            >

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"
                    }}
                >

                    <Avatar
                        sx={{
                            bgcolor: "primary.main",
                            mb: 2
                        }}
                    >

                        <LockOutlinedIcon />

                    </Avatar>

                    <Typography
                        variant="h4"
                        fontWeight="bold"
                    >
                        Health Care System
                    </Typography>

                    <Typography
                        color="text.secondary"
                        sx={{ mb: 4 }}
                    >
                        Sign in to continue
                    </Typography>

                </Box>

                {errors.general && (

                    <Alert
                        severity="error"
                        sx={{ mb: 2 }}
                    >
                        {errors.general}
                    </Alert>

                )}

                <AppTextField

                    label="Username"

                    name="userName"

                    value={credentials.userName}

                    onChange={handleChange}

                    error={errors.userName}

                    helperText={errors.userName}

                    required

                />

                <Box sx={{ mt: 2 }} />

                <AppTextField

                    label="Password"

                    type="password"

                    name="password"

                    value={credentials.password}

                    onChange={handleChange}

                    error={errors.password}

                    helperText={errors.password}

                    required

                />

                <Button

                    fullWidth

                    variant="contained"

                    size="large"

                    sx={{ mt: 4 }}

                    onClick={onSubmit}

                    disabled={loading}

                >

                    {loading ? "Signing In..." : "Login"}

                </Button>

            </Paper>

        </Container>

    );

}
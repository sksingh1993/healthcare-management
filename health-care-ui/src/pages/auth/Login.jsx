import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { login as loginService } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";
import LoginForm from "../../components/auth/LoginForm";
import { Box, Card, CardMedia } from "@mui/material";

export default function Login() {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [credentials, setCredentials] = useState({
        userName: "",
        password: ""
    });

    const [errors, setErrors] = useState({});

    const [loading, setLoading] = useState(false);

    const validate = () => {

        const validationErrors = {};

        if (!credentials.userName.trim()) {
            validationErrors.userName = "Username is required";
        }

        if (!credentials.password.trim()) {
            validationErrors.password = "Password is required";
        }

        setErrors(validationErrors);

        return Object.keys(validationErrors).length === 0;
    };

    const handleSubmit = async () => {

        if (!validate()) {
            return;
        }

        try {

            setLoading(true);

            const response = await loginService(credentials);

            login(response);

            navigate("/dashboard");

        } catch (error) {

            setErrors({
                general:
                    error.response?.data?.message ||
                    "Invalid username or password"
            });

        } finally {

            setLoading(false);

        }

    };

    return (

        <Box
            sx={{
                backgroundImage: "url('/heart_with_name2.png')", // put your image path here
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 100%", // stretches to fill width & height
                backgroundPosition: "center",
                height: "100vh",
                width: "100vw",
                display: "flex",
                justifyContent: "center",
                paddingTop:"5vh",
                alignItems: "center",
            }}
        >

            
                <LoginForm
                credentials={credentials}
                setCredentials={setCredentials}
                errors={errors}
                setErrors={setErrors}
                loading={loading}
                onSubmit={handleSubmit}
            />
           

        </Box>




    );

}
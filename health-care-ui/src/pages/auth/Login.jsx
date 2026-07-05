import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { login as loginService } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";
import LoginForm from "../../components/auth/LoginForm";

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

        <LoginForm
            credentials={credentials}
            setCredentials={setCredentials}
            errors={errors}
            setErrors={setErrors}
            loading={loading}
            onSubmit={handleSubmit}
        />

    );

}
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { login as loginService } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

function Login() {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [formData, setFormData] = useState({
        userName: "",
        password: ""
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        try {

            const response = await loginService(formData);


            login(response);
        


            navigate("/dashboard");

        } catch (err) {

            setError(
                err.response?.data?.message ||
                "Invalid username or password"
            );
        }

    };

    return (
        <div
            style={{
                width: "350px",
                margin: "100px auto"
            }}
        >

            <h2>Health Care Login</h2>

            <form onSubmit={handleSubmit}>

                <div>

                    <label>Username</label>

                    <br />

                    <input
                        type="text"
                        name="userName"
                        value={formData.userName}
                        onChange={handleChange}
                    />

                </div>

                <br />

                <div>

                    <label>Password</label>

                    <br />

                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />

                </div>

                <br />

                {error &&

                    <p style={{ color: "red" }}>
                        {error}
                    </p>

                }

                <button type="submit">

                    Login

                </button>

            </form>

        </div>
    );

}

export default Login;
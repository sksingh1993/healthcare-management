import {
    AppBar,
    Box,
    Button,
    Toolbar,
    Typography
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import Clock from "../clock/Clock";



export default function Header({ drawerWidth }) {

    const navigate = useNavigate();

    const { user, logout } = useAuth();

    const handleLogout = () => {

        logout();

        navigate("/login");
    };

    return (

        <AppBar
            position="fixed"
            sx={{
                width: `calc(100% - ${drawerWidth}px)`,
                ml: `${drawerWidth}px`,
                //height:147
            }}
        >

            <Toolbar>

                <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold" }}
                >
                    Health Care Management System
                </Typography>

                <Box sx={{ flexGrow: 1 }} />

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 3
                    }}
                >

                    <Typography>

                        Welcome,

                        <b>
                            {" "}
                            {user?.fullName}
                        </b>

                    </Typography>

                    <Clock/>

                    <Button
                        color="inherit"
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>

                </Box>

            </Toolbar>

        </AppBar>

    );

}
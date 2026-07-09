import { Outlet } from "react-router-dom";

import {
    Box,
    Toolbar
} from "@mui/material";

import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";

const drawerWidth = 240;

export default function MainLayout() {

    return (

        <Box sx={{ display: "flex" }}>

            <Header drawerWidth={drawerWidth} />

            <Sidebar drawerWidth={drawerWidth} />

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    bgcolor: "#f5f7fa",
                    minHeight: "100vh",
                    pl: 3,
                   // pt:10
                }}
            >
                <Toolbar />

                <Outlet />

            </Box>

        </Box>

    );

}
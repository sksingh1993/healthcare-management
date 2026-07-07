import { NavLink } from "react-router-dom";

import {
    Box,
    Card,
    CardMedia,
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import PersonIcon from "@mui/icons-material/Person";
import GroupsIcon from "@mui/icons-material/Groups";
import EventIcon from "@mui/icons-material/Event";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";

const drawerWidth = 240;

const menus = [
    {
        text: "Dashboard",
        icon: <DashboardIcon />,
        path: "/dashboard"
    },
    {
        text: "Doctors",
        icon: <MedicalServicesIcon />,
        path: "/doctor"
    },
    {
        text: "Patients",
        icon: <PersonIcon />,
        path: "/patient"
    },
    {
        text: "Staff",
        icon: <GroupsIcon />,
        path: "/staff"
    },
    {
        text: "Appointments",
        icon: <EventIcon />,
        path: "/appointment"
    },
    {
        text: "Schedule",
        icon: <CalendarMonthIcon />,
        path: "/schedule"
    },
    {
        text: "Leave",
        icon: <BeachAccessIcon />,
        path: "/leave"
    }
];

export default function Sidebar() {

    return (

        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,

                "& .MuiDrawer-paper": {
                    width: drawerWidth,
                    boxSizing: "border-box"
                }
            }}
        >
         <Card>
                <CardMedia
                    component="img"
                    height="200"
                    width="100"
                    image="public\healthCareLogo.jpeg"   // public folder path
                    alt="Banner"
                />
            </Card>

            <Toolbar />

            <Box sx={{ p: 2 }}>

                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: "bold",
                        mb: 2
                    }}
                >
                    Health Care
                </Typography>

                <List>

                    {
                        menus.map(menu => (

                            <ListItemButton
                                key={menu.text}
                                component={NavLink}
                                to={menu.path}
                                sx={{
                                    borderRadius: 2,
                                    mb: 1,

                                    "&.active": {
                                        bgcolor: "primary.main",
                                        color: "white",

                                        "& .MuiListItemIcon-root": {
                                            color: "white"
                                        }
                                    }
                                }}
                            >

                                <ListItemIcon>
                                    {menu.icon}
                                </ListItemIcon>

                                <ListItemText
                                    primary={menu.text}
                                />

                            </ListItemButton>

                        ))
                    }

                </List>

            </Box>

        </Drawer>

    );

}
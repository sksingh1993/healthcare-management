import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Login from "../pages/auth/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import DoctorList from "../pages/doctor/DoctorList";


import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "./ProtectedRoute";
import Clock from "../components/clock/Clock";

import "../style/header.css";
import DoctorForm from "../pages/doctor/DoctorForm";
import CreateDoctor from "../pages/doctor/CreateDoctor";
import ViewDoctor from "../pages/doctor/ViewDoctor";
import EditDoctor from "../pages/doctor/EditDoctor";

export default function AppRoutes() {

    return (
        <BrowserRouter>
           

            <Routes>

                {/* Public Route */}
                <Route path="/login" element={<Login />} />

                {/* Protected Routes */}
                <Route element={<ProtectedRoute />}>
                    <Route element={<MainLayout />}>

                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/doctor" element={<DoctorList />} />
                        <Route path="/doctor/new" element={<CreateDoctor />} />
                        <Route path="/doctor/:id" element={<ViewDoctor />} />
                        <Route path="/doctor/edit/:id" element={<EditDoctor />} />
                        {/* <Route path="/doctor/new" element={<CreateDoctor />} />

                        <Route path="/doctor/edit/:id" element={<EditDoctor />} />

                        <Route path="/doctor/view/:id" element={<ViewDoctor />} /> */}
                        
                        {/* <Route path="/patient" element={<PatientList />} />
                        <Route path="/staff" element={<StaffList />} />
                        <Route path="/appointment" element={<AppointmentList />} />
                        <Route path="/leave" element={<LeaveList />} />
                        <Route path="/schedule" element={<ScheduleList />} /> */}

                    </Route>
                </Route>

                {/* Default */}
                <Route path="*" element={<Navigate to="/dashboard" replace />} />

            </Routes>
            
            

        </BrowserRouter>
    );
}
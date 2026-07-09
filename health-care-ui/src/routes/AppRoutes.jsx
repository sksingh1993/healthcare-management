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
import PatientList from "../pages/patient/PatientList";
import CreatePatient from "../pages/patient/CreatePatient";
import ViewPatient from "../pages/patient/ViewPatient";
import EditPatient from "../pages/patient/EditPatient";
import StaffList from "../pages/staff/StaffList";
import CreateStaff from "../pages/staff/CreateStaff";
import EditStaff from "../pages/staff/EditStaff";
import ViewStaff from "../pages/staff/ViewStaff";
import LeaveList from "../pages/leave/LeaveList";
import CreateLeave from "../pages/leave/CreateLeave";
import ViewLeave from "../pages/leave/ViewLeave";

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

                        <Route path="/patient" element={<PatientList />}/>
                        <Route path="/patient/new" element={<CreatePatient />}/>
                        <Route path="/patient/:id" element={<ViewPatient />}/>
                        <Route path="/patient/edit/:id" element={<EditPatient />}/>

                        <Route path="/staff" element={<StaffList />} />
                        <Route path="/staff/new" element={<CreateStaff />} />
                        <Route path="/staff/edit/:id" element={<EditStaff />} />
                        <Route path="/staff/:id" element={<ViewStaff />} />
                        
                        <Route path="/leave" element={<LeaveList />} />
                        <Route path="/leave/new" element={<CreateLeave />} />
                        <Route path="/leave/edit/:id" element={<LeaveList />} />
                        <Route path="/leave/:id" element={<ViewLeave />} />

                    </Route>
                </Route>

                {/* Default */}
                <Route path="*" element={<Navigate to="/dashboard" replace />} />

            </Routes>
            
            

        </BrowserRouter>
    );
}
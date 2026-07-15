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
import LeaveEdit from "../pages/leave/LeaveEdit";
import ScheduleList from "../pages/schedule/ScheduleList";
import CreateSchedule from "../pages/schedule/CreateSchedule";
import ScheduleEdit from "../pages/schedule/ScheduleEdit";
import AppointmentList from "../pages/appointment/AppointmentList";
import CreateAppointment from "../pages/appointment/CreateAppointment";
import ViewAppointment from "../pages/appointment/ViewAppointment";
import EditAppointment from "../pages/appointment/EditAppointment";

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
                        <Route path="/doctor/:doctorId" element={<ViewDoctor />} />
                        <Route path="/doctor/edit/:doctorId" element={<EditDoctor />} />

                        <Route path="/patient" element={<PatientList />} />
                        <Route path="/patient/new" element={<CreatePatient />} />
                        <Route path="/patient/:id" element={<ViewPatient />} />
                        <Route path="/patient/edit/:id" element={<EditPatient />} />

                        <Route path="/staff" element={<StaffList />} />
                        <Route path="/staff/new" element={<CreateStaff />} />
                        <Route path="/staff/edit/:id" element={<EditStaff />} />
                        <Route path="/staff/:id" element={<ViewStaff />} />

                        <Route path="/doctor/:doctorId/leave" element={<LeaveList />} />
                        <Route path="/leave" element={<LeaveList />} />
                        <Route path="/doctor/:doctorId/leave/new" element={<CreateLeave />} />
                        <Route path="/doctor/:doctorId/leave/edit/:leaveId" element={<LeaveEdit />} />
                        <Route path="/leave/edit/:id" element={<LeaveList />} />
                        <Route path="/leave/:id" element={<ViewLeave />} />

                        <Route path="/doctor/:doctorId/schedule" element={<ScheduleList />} />
                        <Route path="/schedule" element={<ScheduleList />} />
                        <Route path="/doctor/:doctorId/schedule/new" element={<CreateSchedule />} />
                        <Route path="/doctor/:doctorId/schedule/edit/:scheduleId" element={<ScheduleEdit />} />

                        <Route path="/appointment" element={<AppointmentList />} />

                        <Route path="/appointment/new" element={<CreateAppointment />} />

                        <Route path="/appointment/:id" element={<ViewAppointment />} />

                        <Route path="/appointment/edit/:id" element={<EditAppointment />} />

                    </Route>
                </Route>

                {/* Default */}
                <Route path="*" element={<Navigate to="/dashboard" replace />} />

            </Routes>



        </BrowserRouter>
    );
}
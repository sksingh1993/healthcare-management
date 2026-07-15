import { useNavigate } from "react-router-dom";

import {
    searchAppointments,
    cancelAppointment,
    checkInAppointment,
    completeAppointment
} from "../../services/appointmentService";
import { useEffect, useState } from "react";
import AppointmentSearch from "../../components/appointment/AppointmentSearch";
import AppointmentTable from "../../components/appointment/AppointmentTable";
import PageHeader from "../../components/common/PageHeader";
import { initialAppointmentSearch } from "./appointmentConstant";
import { Button, ButtonGroup, Stack } from "@mui/material";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import { handleApiError } from "../../utils/apiErrorHandler";
function AppointmentList() {
    const [appointments, setAppointments] = useState([]);

    const navigate = useNavigate();
    
    const [search, setSearch] = useState(initialAppointmentSearch);

    const [page, setPage] = useState(0);

    const [size] = useState(5);

    const [totalPages, setTotalPages] = useState(0);

    const [loading, setLoading] = useState(false);

    const [selectedAppointment, setSelectedAppointment] = useState(null);

    const [cancelDialogOpen, setCancelDialogOpen] = useState(false);

    const [checkInDialogOpen, setCheckInDialogOpen] = useState(false);

    const [completeDialogOpen, setCompleteDialogOpen] = useState(false);
    const [cancelLoading, setCancelLoading] = useState(false);

    const [checkInLoading, setCheckInLoading] = useState(false);

    const [completeLoading, setCompleteLoading] = useState(false);
    useEffect(() => {

        loadAppointments();

    }, []);

    useEffect(() => {

        loadAppointments();

    }, [page]);
    const loadAppointments = async () => {

        try {

            setLoading(true);

            const response = await searchAppointments({

                ...search,

                page,

                size,

                sort: "appointmentDate,desc"

            });
            console.log("Appoint ment List : ",response);

            setAppointments(response.data.data.content);

            setTotalPages(response.data.data.totalPages);

        } catch (error) {

            handleApiError(error);

        } finally {

            setLoading(false);

        }

    };
    const handleSearch = () => {

        setPage(0);

        loadAppointments();

    };

    const handleReset = () => {

        setSearch(initialAppointmentSearch);

        setPage(0);

        loadAppointments(initialAppointmentSearch, 0);

    };
    const handleSearchChange = (event) => {

        const { name, value } = event.target;

        setSearch(prev => ({

            ...prev,

            [name]: value

        }));

    };

    const handleCancel = async () => {

        try {

            setCancelLoading(true);

            await cancelAppointment(selectedAppointment.id);

            setCancelDialogOpen(false);

            setSelectedAppointment(null);

            loadAppointments();

        } catch (error) {

            handleApiError(error);

        } finally {

            setCancelLoading(false);

        }

    };

    const handleCheckIn = async (id) => {

        try {

            setCheckInLoading(true);

            await checkInAppointment(id);

            loadAppointments();

        } catch (error) {

            handleApiError(error);

        } finally {

            setCheckInLoading(false);

        }

    };

    const handleComplete = async (id) => {

        try {

            setCompleteLoading(true);

            await completeAppointment(id);

            loadAppointments();

        } catch (error) {

            handleApiError(error);

        } finally {

            setCompleteLoading(false);

        }

    };
    return (
        <>

            <PageHeader
                title="Appointments"
                actions={
                    <Stack direction="row" spacing={1}>
                        <Button
                            variant="contained"
                            onClick={() => navigate("/appointment/new")}
                        >
                            Book Appointment
                        </Button>

                    </Stack>
                }
            />


            <AppointmentSearch

                search={search}

                onChange={handleSearchChange}

                onSearch={handleSearch}

                onReset={handleReset}

            />

            <AppointmentTable

                appointments={appointments}

                onView={(id) => navigate(`/appointment/${id}`)}

                onEdit={(id) => navigate(`/appointment/edit/${id}`)}

                onCancel={(appointment) => {

                    setSelectedAppointment(appointment);

                    setCancelDialogOpen(true);

                }}

                onCheckIn={handleCheckIn}

                onComplete={handleComplete}

            />
            <Button
                variant="outlined"
                disabled={page === 0}
                onClick={() => setPage(prev => prev - 1)}
            >
                Previous
            </Button>

            <span style={{ margin: "0 16px" }}>
                Page {page + 1} of {totalPages}
            </span>

            <Button
                variant="outlined"
                disabled={page + 1 >= totalPages}
                onClick={() => setPage(prev => prev + 1)}
            >
                Next
            </Button>
            <ConfirmDialog

                open={cancelDialogOpen}

                title="Cancel Appointment"

                message={`Cancel appointment ${selectedAppointment?.appointmentCode}?`}

                loading={cancelLoading}

                onCancel={() => {

                    setCancelDialogOpen(false);

                    setSelectedAppointment(null);

                }}

                onConfirm={handleCancel}

            />
        </>
    )
}
export default AppointmentList;
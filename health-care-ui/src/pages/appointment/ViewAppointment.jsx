import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import AppointmentDetail from "../../components/appointment/AppointmentDetail";
import PageHeader from "../../components/common/PageHeader";

import { getAppointment, cancelAppointment, checkInAppointment, completeAppointment } from "../../services/appointmentService";
import { handleApiError } from "../../utils/apiErrorHandler";

import ConfirmDialog from "../../components/common/ConfirmDialog";

export default function ViewAppointment() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [appointment, setAppointment] = useState(null);

    const [loading, setLoading] = useState(true);

    const [cancelDialogOpen, setCancelDialogOpen] = useState(false);

    const [cancelLoading, setCancelLoading] = useState(false);

    const [checkInDialogOpen, setCheckInDialogOpen] = useState(false);

    const [checkInLoading, setCheckInLoading] = useState(false);

    const [completeDialogOpen, setCompleteDialogOpen] = useState(false);

    const [completeLoading, setCompleteLoading] = useState(false);

    useEffect(() => {

        loadAppointment();

    }, []);

    const loadAppointment = async () => {

        try {

            const response = await getAppointment(id);

            setAppointment(response.data.data);

        } catch (error) {

            handleApiError(error);

        } finally {

            setLoading(false);

        }

    };

    if (loading) {

        return <div>Loading...</div>;

    }

    const handleCancel = async () => {

        try {
            
            setCancelLoading(true);

            await cancelAppointment(id);

            //toast.success("Appointment cancelled successfully");

            setCancelDialogOpen(false);

            loadAppointment();

        } catch (error) {

            handleApiError(error);

        } finally {

            setCancelLoading(false);

        }

    };

    const handleCheckIn = async () => {

        try {

            setCheckInLoading(true);

            await checkInAppointment(id);

             //toast.success("Patient checked in successfully");

            setCheckInDialogOpen(false);

            loadAppointment();

        } catch (error) {

            handleApiError(error);

        } finally {

            setCheckInLoading(false);

        }

    };

    const handleComplete = async () => {

        try {

            setCompleteLoading(true);

            await completeAppointment(id);

            //toast.success("Appointment completed successfully");

            setCompleteDialogOpen(false);

            loadAppointment();

        } catch (error) {

            handleApiError(error);

        } finally {

            setCompleteLoading(false);

        }

    };



    return (

        <>
            <PageHeader

                title="Appointment Details"

                showButton={false}

            />

            <AppointmentDetail
                appointment={appointment}
                onEdit={() => navigate(`/appointment/edit/${id}`)}
                onBack={() => navigate("/appointment")}
                onCancel={() => setCancelDialogOpen(true)}
                onCheckIn={() => setCheckInDialogOpen(true)}
                onComplete={() => setCompleteDialogOpen(true)}
            />

            <ConfirmDialog

                open={cancelDialogOpen}

                title="Cancel Appointment"

                message={`Are you sure you want to cancel appointment ${appointment?.appointmentCode}?`}

                loading={cancelLoading}

                onCancel={() => setCancelDialogOpen(false)}

                onConfirm={handleCancel}

                actionName={"Cinfirm"}

            />

            <ConfirmDialog

                open={checkInDialogOpen}

                title="Patient Check In"

                message={`Check in patient for appointment ${appointment?.appointmentCode}?`}

                loading={checkInLoading}

                onCancel={() => setCheckInDialogOpen(false)}

                onConfirm={handleCheckIn}

                actionName={"Cinfirm"}

            />

            <ConfirmDialog

                open={completeDialogOpen}

                title="Complete Appointment"

                message={`Complete appointment ${appointment?.appointmentCode}?`}

                loading={completeLoading}

                onCancel={() => setCompleteDialogOpen(false)}

                onConfirm={handleComplete}

                actionName={"Cinfirm"}

            />

        </>

    );

}
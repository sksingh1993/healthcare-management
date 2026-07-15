import { useParams } from "react-router-dom";
import AppointmentForm from "../../components/appointment/AppointmentForm";

export default function EditAppointment() {

    const { id } = useParams();


    return (
        <AppointmentForm
            editMode={true}
            appointmentId={id}
        />
    );
}
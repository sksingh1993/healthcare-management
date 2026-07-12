import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";



import { toast } from "react-toastify";
import { handleApiError } from "../../utils/apiErrorHandler";
import { initialSchedule } from "./scheduleConstant";
import { createSchedule } from "../../services/scheduleService";
import ScheduleForm from "../../components/schedule/ScheduleForm";



export default function CreateSchedule() {

    const navigate = useNavigate();
    const {doctorId} = useParams()

    const [schedule, setSchedule] = useState(initialSchedule);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

//console.log("Create leave for doctor id :",doctorId)
const handleSave = async () => {

    //const validationErrors = validatePatient(patient);

    // if (Object.keys(validationErrors).length > 0) {

    //     setErrors(validationErrors);

    //     return;

    // }

    try {

        setLoading(true);

        const response = await createSchedule(doctorId,schedule);

        toast.success(response.message);

        navigate(`/doctor/${doctorId}/schedule`);

    } catch (error) {

        if (error.response?.data?.validationErrors) {

            setErrors(error.response.data.validationErrors);

            return;

        }

        handleApiError(error);

    } finally {

        setLoading(false);

    }

};
    return (

        <ScheduleForm
            title="Add Schedule"
            schedule={schedule}
            setSchedule={setSchedule}
            setErrors={setErrors}
            

            errors={errors}

            loading={loading}

            onSubmit={handleSave}

            onCancel={() => navigate("/schedule")}

            submitButtonText="Add Schedule"
        />

    );

}
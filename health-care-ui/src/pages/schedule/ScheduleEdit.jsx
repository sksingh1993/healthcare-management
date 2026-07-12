import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";






import { handleApiError } from "../../utils/apiErrorHandler";
import { initialSchedule } from "./scheduleConstant";
import { getScheduleById, updateSchedule } from "../../services/scheduleService";
import ScheduleEditForm from "../../components/schedule/ScheduleEditForm";


export default function ScheduleEdit() {

    const { scheduleId } = useParams();

    const { doctorId } = useParams();

    const navigate = useNavigate();

    const [schedule, setSchedule] = useState(initialSchedule);

    const [errors, setErrors] = useState({});

    const [loading, setLoading] = useState(false);

    useEffect(() => {

        loadSchedule();

    }, []);
    console.log("Doctor id:", doctorId)
    //console.log("Leave id:",leaveId)
    const loadSchedule = async () => {

        try {

            setLoading(true);

            const response = await getScheduleById(doctorId, scheduleId);
            console.log(response);

            setSchedule(response.data);

        } catch (error) {

            handleApiError(error);

        } finally {

            setLoading(false);

        }

    };

    const handleSubmit = async () => {

        try {

            setLoading(true);

            await updateSchedule(doctorId, scheduleId, schedule);

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


        <ScheduleEditForm

            title="Edit Schedule"

            schedule={schedule}

            setSchedule={setSchedule}

            errors={errors}

            setErrors={setErrors}

            loading={loading}

            onSubmit={handleSubmit}

            onCancel={() => navigate(`/doctor/${doctorId}/schedule`)}

            submitButtonText="Update Schedule"

        />

    );

}
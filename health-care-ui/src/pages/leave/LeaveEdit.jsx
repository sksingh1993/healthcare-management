import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";






import { handleApiError } from "../../utils/apiErrorHandler";
import { initialLeave } from "./leaveConstant";
import { getLeaveById, updateLeave } from "../../services/leaveService";
import LeaveEditForm from "./LeaveEditForm";


export default function LeaveEdit() {

    const { leaveId } = useParams();

    const { doctorId } = useParams();

    const navigate = useNavigate();

    const [leave, setLeave] = useState(initialLeave);

    const [errors, setErrors] = useState({});

    const [loading, setLoading] = useState(false);

    useEffect(() => {

        loadLeave();

    }, []);
    console.log("Doctor id:",doctorId)
    console.log("Leave id:",leaveId)
    const loadLeave = async () => {

        try {

            setLoading(true);

            const response = await getLeaveById(doctorId,leaveId);
            console.log(response);

            setLeave(response.data);

        } catch (error) {

            handleApiError(error);

        } finally {

            setLoading(false);

        }

    };

    const handleSubmit = async () => {

        try {

            setLoading(true);

            await updateLeave(doctorId,leaveId, leave);

            navigate(`/doctor/${doctorId}/leave`);

        } catch (error) {

            handleApiError(error, setErrors);

        } finally {

            setLoading(false);

        }

    };

    return (
        

        <LeaveEditForm

            title="Edit Leave"

            leave={leave}

            setLeave={setLeave}

            errors={errors}

            setErrors={setErrors}

            loading={loading}

            onSubmit={handleSubmit}

            onCancel={() => navigate(`/doctor/${doctorId}/leave`)}

            submitButtonText="Update Patient"

        />

    );

}
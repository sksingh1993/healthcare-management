import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";



import { toast } from "react-toastify";
import { handleApiError } from "../../utils/apiErrorHandler";

import { initialLeave } from "./leaveConstant";
import { createLeave } from "../../services/leaveService";
import LeaveForm from "./LeaveForm";

export default function CreateLeave() {

    const navigate = useNavigate();
    const {doctorId} = useParams()

    const [leave, setLeave] = useState(initialLeave);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

console.log("Create leave for doctor id :",doctorId)
const handleSave = async () => {

    //const validationErrors = validatePatient(patient);

    // if (Object.keys(validationErrors).length > 0) {

    //     setErrors(validationErrors);

    //     return;

    // }

    try {

        setLoading(true);

        const response = await createLeave(doctorId,leave);

        toast.success(response.message);

        navigate(`/doctor/${doctorId}/leave`);

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

        <LeaveForm
            title="Add Leave"
            leave={leave}
            setLeave={setLeave}
            setErrors={setErrors}
            

            errors={errors}

            loading={loading}

            onSubmit={handleSave}

            onCancel={() => navigate("/leave")}

            submitButtonText="Submit Leave"
        />

    );

}
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import DoctorForm from "./DoctorForm";
import { initialDoctor } from "./doctorConstants";
import { toast } from "react-toastify";
import { createDoctor } from "../../services/doctorService";
import { validateDoctor } from "../../utils/doctorValidation";
import { handleApiError } from "../../utils/apiErrorHandler";

export default function CreateDoctor() {

    const navigate = useNavigate();

    const [doctor, setDoctor] = useState(initialDoctor);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});


const handleSave = async () => {

    const validationErrors = validateDoctor(doctor);

    if (Object.keys(validationErrors).length > 0) {

        setErrors(validationErrors);

        return;

    }

    try {

        setLoading(true);

        const response = await createDoctor(doctor);

        toast.success(response.message);

        navigate("/doctor");

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

        <DoctorForm
            title="Add Doctor"
            doctor={doctor}
            setDoctor={setDoctor}
            setErrors={setErrors}
            

            errors={errors}

            loading={loading}

            onSubmit={handleSave}

            onCancel={() => navigate("/doctor")}

            submitButtonText="Save Doctor"
        />

    );

}
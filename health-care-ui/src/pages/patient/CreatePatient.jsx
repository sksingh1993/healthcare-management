import { useState } from "react";
import { useNavigate } from "react-router-dom";



import { toast } from "react-toastify";
import { handleApiError } from "../../utils/apiErrorHandler";
import { initialPatient } from "./patientConstants";
import { validatePatient } from "../../utils/patientValidation";
import { createPatient } from "../../services/patientService";
import PatientForm from "./PatientForm";

export default function CreatePatient() {

    const navigate = useNavigate();

    const [patient, setPatient] = useState(initialPatient);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});


const handleSave = async () => {

    const validationErrors = validatePatient(patient);

    if (Object.keys(validationErrors).length > 0) {

        setErrors(validationErrors);

        return;

    }

    try {

        setLoading(true);

        const response = await createPatient(patient);

        toast.success(response.message);

        navigate("/patient");

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

        <PatientForm
            title="Add Patient"
            patient={patient}
            setPatient={setPatient}
            setErrors={setErrors}
            

            errors={errors}

            loading={loading}

            onSubmit={handleSave}

            onCancel={() => navigate("/patient")}

            submitButtonText="Save Patient"
        />

    );

}
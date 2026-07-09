import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";






import { handleApiError } from "../../utils/apiErrorHandler";
import { initialPatient, patientInitialSearch } from "./patientConstants";
import { getPatientById, updatePatient } from "../../services/patientService";
import PatientEditForm from "./PatientEditForm";


export default function EditPatient() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [patient, setPatient] = useState(initialPatient);

    const [errors, setErrors] = useState({});

    const [loading, setLoading] = useState(false);

    useEffect(() => {

        loadPatient();

    }, []);

    const loadPatient = async () => {

        try {

            setLoading(true);

            const response = await getPatientById(id);
            console.log(response);

            setPatient(response.data);

        } catch (error) {

            handleApiError(error);

        } finally {

            setLoading(false);

        }

    };

    const handleSubmit = async () => {

        try {

            setLoading(true);

            await updatePatient(id, patient);

            navigate("/patient");

        } catch (error) {

            handleApiError(error, setErrors);

        } finally {

            setLoading(false);

        }

    };

    return (
        

        <PatientEditForm

            title="Edit Patient"

            patient={patient}

            setPatient={setPatient}

            errors={errors}

            setErrors={setErrors}

            loading={loading}

            onSubmit={handleSubmit}

            onCancel={() => navigate("/patient")}

            submitButtonText="Update Patient"

        />

    );

}
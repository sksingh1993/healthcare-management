import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";



import {
    getDoctorById,
    updateDoctor
} from "../../services/doctorService";


import { handleApiError } from "../../utils/apiErrorHandler";
import DoctorForm from "./DoctorForm";
import { initialDoctor } from "./doctorConstants";
import DoctorEditForm from "./DoctorEditForm";

export default function EditDoctor() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [doctor, setDoctor] = useState(initialDoctor);

    const [errors, setErrors] = useState({});

    const [loading, setLoading] = useState(false);

    useEffect(() => {

        loadDoctor();

    }, []);

    const loadDoctor = async () => {

        try {

            setLoading(true);

            const response = await getDoctorById(id);
            console.log(response);

            setDoctor(response.data);

        } catch (error) {

            handleApiError(error);

        } finally {

            setLoading(false);

        }

    };

    const handleSubmit = async () => {

        try {

            setLoading(true);

            await updateDoctor(id, doctor);

            navigate("/doctor");

        } catch (error) {

            handleApiError(error, setErrors);

        } finally {

            setLoading(false);

        }

    };

    return (
        

        <DoctorEditForm

            title="Edit Doctor"

            doctor={doctor}

            setDoctor={setDoctor}

            errors={errors}

            setErrors={setErrors}

            loading={loading}

            onSubmit={handleSubmit}

            onCancel={() => navigate("/doctor")}

            submitButtonText="Update Doctor"

        />

    );

}
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

    const { doctorId } = useParams();

    const navigate = useNavigate();

    const [doctor, setDoctor] = useState(initialDoctor);

    const [errors, setErrors] = useState({});

    const [loading, setLoading] = useState(false);

    useEffect(() => {

        loadDoctor();

    }, []);

    useEffect(() => {
    //console.log("Errors:", errors);
}, [errors]);

    const loadDoctor = async () => {

        try {

            setLoading(true);

            const response = await getDoctorById(doctorId);
           // console.log(response);

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
             console.log(error)

             handleApiError(error, setErrors);

             if (error.response?.data?.validationErrors) {
                console.log("Backend validation:", error.response.data.validationErrors);

            setErrors(error.response.data.validationErrors);

            return;

        }

        handleApiError(error);

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
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";





import { handleApiError } from "../../utils/apiErrorHandler";
import { initialStaff } from "./staffConstants";
import { getStaffById, updateStaff } from "../../services/staffService";
import StaffEditForm from "./StaffEditForm";



export default function EditStaff() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [staff, setStaff] = useState(initialStaff);

    const [errors, setErrors] = useState({});

    const [loading, setLoading] = useState(false);

    useEffect(() => {

        loadStaff();

    }, []);

    useEffect(() => {
    //console.log("Errors:", errors);
}, [errors]);

    const loadStaff = async () => {

        try {

            setLoading(true);

            const response = await getStaffById(id);
           // console.log(response);

            setStaff(response.data);

        } catch (error) {

            handleApiError(error);

        } finally {

            setLoading(false);

        }

    };

    const handleSubmit = async () => {

        try {

            setLoading(true);

            await updateStaff(id, staff);

            navigate("/staff");

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
        

        <StaffEditForm

            title="Edit Staff"

            staff={staff}

            setStaff={setStaff}

            errors={errors}

            setErrors={setErrors}

            loading={loading}

            onSubmit={handleSubmit}

            onCancel={() => navigate("/staff")}

            submitButtonText="Update Staff"

        />

    );

}
import { useState } from "react";
import { useNavigate } from "react-router-dom";


import { toast } from "react-toastify";

import { handleApiError } from "../../utils/apiErrorHandler";
import { initialStaff } from "./staffConstants";
import { validateStaff } from "../../utils/staffValidation";
import { createStaff } from "../../services/staffService";
import StaffForm from "./StaffForm";

export default function CreateStaff() {

    const navigate = useNavigate();

    const [staff, setStaff] = useState(initialStaff);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});


const handleSave = async () => {
    
    const validationErrors = validateStaff(staff);

    if (Object.keys(validationErrors).length > 0) {

        setErrors(validationErrors);

        return;

    }

    try {

        setLoading(true);
        console.log(staff);

        const response = await createStaff(staff);

        toast.success(response.message);

        navigate("/staff");

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

        <StaffForm
            title="Add Staff"
            staff={staff}
            setStaff={setStaff}
            setErrors={setErrors}
            

            errors={errors}

            loading={loading}

            onSubmit={handleSave}

            onCancel={() => navigate("/staff")}

            submitButtonText="Save Staff"
        />

    );

}
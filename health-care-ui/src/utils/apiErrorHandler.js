import { toast } from "react-toastify";

export function handleApiError(error) {

    const response = error.response?.data;

    if (!response) {
        toast.error("Unable to connect to server");
        return;
    }

    if (response.validationErrors) {

        Object.values(response.validationErrors)
            .forEach(message => toast.error(message));

        return;
    }

    toast.error(response.message);
}
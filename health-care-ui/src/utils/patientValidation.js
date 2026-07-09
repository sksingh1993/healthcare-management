export function validatePatient(patient) {

    const errors = {};

 

    if (!patient.firstName?.trim()) {
        errors.firstName = "First Name is required";
    }

    if (!patient.lastName?.trim()) {
        errors.lastName = "Last Name is required";
    }

    if (!patient.gender) {
        errors.gender = "Gender is required";
    }

    if (!patient.dateOfBirth) {
        errors.dateOfBirth = "Date of Birth is required";
    }

    if (!patient.mobile?.trim()) {
        errors.mobile = "Mobile is required";
    }

    if (!patient.email?.trim()) {
        errors.email = "Email is required";
    }

    if (!patient.address?.trim()) {
        errors.address = "Address is required";
    }
    if (!patient.bloodGroup?.trim()) {
        errors.bloodGroup = "BloodGroup is required";
    }
    if (!patient.emergencyContactName?.trim()) {
        errors.emergencyContactName = "Emergency Contact Name is required";
    }
    if (!patient.emergencyContactNumber?.trim()) {
        errors.emergencyContactNumber = "Emergency Contact Number is required";
    }

    return errors;
}
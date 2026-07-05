export function validateDoctor(doctor) {

    const errors = {};

    if (!doctor.username?.trim()) {
        errors.username = "Username is required";
    }

    if (!doctor.password?.trim()) {
        errors.password = "Password is required";
    }

    if (!doctor.firstName?.trim()) {
        errors.firstName = "First Name is required";
    }

    if (!doctor.lastName?.trim()) {
        errors.lastName = "Last Name is required";
    }

    if (!doctor.gender) {
        errors.gender = "Gender is required";
    }

    if (!doctor.dateOfBirth) {
        errors.dateOfBirth = "Date of Birth is required";
    }

    if (!doctor.mobile?.trim()) {
        errors.mobile = "Mobile is required";
    }

    if (!doctor.email?.trim()) {
        errors.email = "Email is required";
    }

    if (!doctor.specialization) {
        errors.specialization = "Specialization is required";
    }

    if (!doctor.qualification?.trim()) {
        errors.qualification = "Qualification is required";
    }

    if (!doctor.experienceYears) {
        errors.experienceYears = "Experience is required";
    }

    if (!doctor.consultationFee) {
        errors.consultationFee = "Consultation Fee is required";
    }

    if (!doctor.registrationNumber?.trim()) {
        errors.registrationNumber = "Registration Number is required";
    }

    if (!doctor.address?.trim()) {
        errors.address = "Address is required";
    }

    return errors;
}
export function validateStaff(staff) {

    const errors = {};

    if (!staff.username?.trim()) {
        errors.username = "Username is required";
    }

    if (!staff.password?.trim()) {
        errors.password = "Password is required";
    }

    if (!staff.firstName?.trim()) {
        errors.firstName = "First Name is required";
    }

    if (!staff.lastName?.trim()) {
        errors.lastName = "Last Name is required";
    }

    if (!staff.gender) {
        errors.gender = "Gender is required";
    }

    if (!staff.dateOfBirth) {
        errors.dateOfBirth = "Date of Birth is required";
    }

    if (!staff.mobile?.trim()) {
        errors.mobile = "Mobile is required";
    }

    if (!staff.email?.trim()) {
        errors.email = "Email is required";
    }

    if (!staff.department) {
        errors.department = "Department is required";
    }

    if (!staff.designation?.trim()) {
        errors.designation = "Designation is required";
    }

    if (!staff.joiningDate) {
        errors.joiningDate = "Joining Date is required";
    }

    return errors;
}
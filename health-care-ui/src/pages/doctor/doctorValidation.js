export function validateDoctor(doctor){

    const errors = {};

    if(!doctor.firstName){

        errors.firstName="First Name is required";

    }

    if(!doctor.lastName){

        errors.lastName="Last Name is required";

    }

    if(!doctor.mobile){

        errors.mobile="Mobile is required";

    }

    return errors;

}

const validationErrors = validateDoctor(doctor);

if(Object.keys(validationErrors).length){

    setErrors(validationErrors);

    return;

}
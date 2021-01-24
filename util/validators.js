const validateRegisterInput = (
    username,
    email,
    password,
    confirmPassword
) => {
    const errors = {};
    if (username.trim() === '') {
        errors.username = "Username cannot not be empty";
    }
    if (email.trim() === '') {
        errors.email = "Email cannot not be empty";
    } else { //if not empty check for valid email id 
        const regEx = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
        if (!email.match(regEx)) {
            errors.email = "Email is not valid";
        }
    }
    if (password === '') {
        errors.password = "Password cannot not be empty";
    } else {
        if (password !== confirmPassword) {
            errors.password = "Passwords must match";
        } else if (password.trim().length < 7) {
            errors.password = "Password should at least be 8 characters in length";
        }
    }
    return {
        errors,
        valid: Object.keys(errors).length < 1
    };
}

const validateLoginInput = (
    email,
    password
) => {
    const errors = {};
    if (email.trim() === '') {
        errors.email = "Email cannot not be empty";
    } else {
        const regEx = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
        if (!email.match(regEx)) {
            errors.email = "Email is not valid";
        }
    }
    if (password === '') {
        errors.password = "Password cannot not be empty";
    }
    return {
        errors,
        valid: Object.keys(errors).length < 1
    };
}


const validatePhotobookInput = (photobookInput) => {
    for (let photo of photobookInput) {
        if (photo.img_data.trim() === '') {
            return false;
        }
    }
    return true;
};

module.exports = {
    validateRegisterInput,
    validateLoginInput
}
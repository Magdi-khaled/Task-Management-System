export const validateFname = () => {
    if (!fname.value) return 'first name is required.';
};
export const validateLname = () => {
    if (!lname.value) return 'last name is required.';
};
export const validateEmail = () => {
    if (!email.value) return 'Email is required.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) return 'Invalid email format.';
    return null;
};
export const validatePassword = () => {
    if (!password.value) return 'Password is required.';
};
export const validateRepeatPassword = () => {
    if (!repeatpassword.value) return 'confirm password is required.';
    if (repeatpassword.value !== password.value) return 'Passwords not matched.';
};
export const validateTitle = () => {
    if (!title.value) return 'field title is required.';
};
export const validateStatus = () => {
    if (!status.value) return 'field status is required.';
};
export const validateDescription = () => {
    if (!description.value) return 'field description is required.';
};
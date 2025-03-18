export const validateEmail = () => {
    if (!email.value) return 'Email is required.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) return 'Invalid email format.';
    return null;
};
export const validatePassword = () => {
    if (!password.value) return 'Password is required.';
};
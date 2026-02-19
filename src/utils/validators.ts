export const isEmailValid = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

export const isPhoneValid = (phone: string) => {
    const regex = /^[0-9]{10,15}$/;
    return regex.test(phone);
};

export const isNotEmpty = (value: string) => {
    return value.trim().length > 0;
};

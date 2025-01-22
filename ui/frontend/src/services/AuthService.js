import instance from "./axiosConfig";

export const createUser = async (user) => {
    return instance.post('/auth/register', user);
}

export const loginUser = async (userDetails) => {
    return instance.post('/auth/login', userDetails);
}

export const logoutUser = async () => {
    return instance.post('/auth/logout', {})
}

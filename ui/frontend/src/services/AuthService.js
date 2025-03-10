import {instance} from "./axiosConfig";
import {authInstance} from "./axiosConfig";

export const createUser = async (user) => {
    return authInstance.post('/auth/register', user);
}

export const loginUser = async (userDetails) => {
    return authInstance.post('/auth/login', userDetails);
}

export const logoutUser = async () => {
    return instance.post('/auth/logout', {})
}

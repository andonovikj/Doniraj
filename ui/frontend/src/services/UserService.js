import instance from './axiosConfig';

export const getUsers = async() => {
    return instance.get('/user/all');
}

export const getUser = async (id) => {
    return instance.get(`/user/${id}`);
}

export const createUser = async (user) => {
    return instance.post('/user/register', user);
}

export const updateUser = async (id, user) => {
    return instance.put(`user/update/${id}`, user);
}

export const deleteUser = async (id) => {
    return instance.delete(`/user/delete/${id}`);
}
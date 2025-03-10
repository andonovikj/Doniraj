import instance from './axiosConfig';

export const getUsers = async() => {
    return instance.get('/user/all', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    });
}

export const getUser = async (id) => {
    return instance.get(`/user/${id}`);
}

export const updateUser = async (id, user) => {
    return instance.put(`user/update/${id}`, user);
}

export const deleteUser = async (id) => {
    return instance.delete(`/user/delete/${id}`);
}

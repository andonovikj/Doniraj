import instance from "./axiosConfig";

export const getClaims = async () => {
    return await instance.get('/claim/all');
}

export const getClaim = async (id) => {
    return await instance.get(`/claim/${id}`);
}

export const createClaim = async (claim) => {
    return await instance.post(`/claim/add`, claim);
}

export const updateClaim = async (id, claim) => {
    return await instance.put(`/claim/update/${id}`, claim);
}

export const deleteClaim = async (id) => {
    return await instance.delete(`/claim/delete/${id}`);
}
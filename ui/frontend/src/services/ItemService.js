import instance from "./axiosConfig";

export const getItems = async () => {
    return await instance.get('/item/all');
}

export const getItem  = async (id) => {
    return await instance.get(`/item/${id}`)
}

export const createItem = async (item) => {
    return await instance.post('/item/add', item);
}

export const updateItem = async (id, item) => {
    return await instance.put(`/item/update/${id}`, item);
}

export const deleteItem = async (id) => {
    return await instance.delete(`/item/delete/${id}`);
}
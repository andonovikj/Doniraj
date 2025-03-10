import {instance} from './axiosConfig';


    export const getCities = async () => {
        return await instance.get(`/city/all`);
    }

    export const deleteCity = async (id, params) => {
        return await instance.delete(`/city/delete/${id}`, {
            params: params,
        });
    }

    export const getCity = async (id) => {
        return await instance.get(`/city/${id}`);
    }

    export const createCity = async (city) => {
        return await instance.post('/city/add', city);
    }

    export const updateCity = async (id, city) => {
        return await instance.put(`/city/update/${id}`, city);
    }




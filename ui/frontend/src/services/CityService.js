import instance from './axiosConfig';


    export const getCities = async () => {
        return await instance.get(`/city/all`);
    }

    //TODO: FIX BUG FK CONSTRAINT VIOLATION FOR USER AND ITEM TABLES. ASK ADMIN IN A FORM FOR TARGETED CITY :((
    export const deleteCity = async (id) => {
        return await instance.delete(`/city/delete/${id}`);
    }

    export const getCity = async (id) => {
        return await instance.get(`/city/${id}`);
    }



import axios from "axios";

/*
This method allows us to set default values for headers, timeouts, interceptors,
and other properties that will be applied to all requests made by that instance.
It is useful when we have to make multiple requests to the same API
or when we need to customize the request behavior for a particular endpoint.

With this, we can easily call our Spring Boot endpoints from the frontend code
without needing to repeatedly specify our full backend URL
*/

const instance = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Access-Control-Allow-Origin' : '*'
    }
})

export default instance;
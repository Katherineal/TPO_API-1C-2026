import axios from "axios";

const API = axios.create({

    baseURL: ""
});

// API.interceptors.request.use(

//     (config) => {

//         const token =
//             localStorage.getItem("token");

//         if (token && token !== "undefined" && token !== "null") {

//             config.headers.Authorization =
//                 `Bearer ${token}`;
//         }

//         return config;
//     }
// );

API.defaults.withCredentials = true

export default API;

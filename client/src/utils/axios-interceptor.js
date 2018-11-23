import axios from 'axios';
import promise from 'promise';

// Request interceptor
axios.interceptors.request.use(
    function (config) {
        if (config.method !== 'OPTIONS') {
            config.headers.withCredentials = true;

            const userToken = window.localStorage['token'];
            userToken &&
                (config.headers.Authorization = 'Bearer '+ userToken);
        }
        return config;
    }, function (error) {
        return promise.reject(error);
    });

// Response interceptor
axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return promise.reject(error);
});


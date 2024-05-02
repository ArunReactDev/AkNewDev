import { userService } from 'service/user.service';
import getConfig from 'next/config';
import axios from 'axios';

const { publicRuntimeConfig } = getConfig();

export const fetchWrapper = {
    get,
    post,
    put,
    delete: _delete,
    postFile
};

function get(url) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(url)
    };
    return fetch(url, requestOptions).then(handleResponse);
}

function post(url, body) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeader(url) },
        body: JSON.stringify(body)
    };
    return fetch(url, requestOptions).then(handleResponse);
}

function put(url, body) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...authHeader(url) },
        body: JSON.stringify(body)
    };
    return fetch(url, requestOptions).then(handleResponse);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(url) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader(url)
    };
    return fetch(url, requestOptions).then(handleResponse);
}


function postFile(url, body) {
    const requestOptions = {
        headers: {
            'Content-Type': 'multipart/form-data',
            ...authHeader(url)
        },
    };
    return axios.post(url, body, requestOptions).then(x => x.data).catch(handleError);
}


// helper functions

function authHeader(url) {

    // return auth header with jwt if user is logged in and request is to the api url
    const isLoggedIn = localStorage.getItem("ust");
    const isApiUrl = url.startsWith(publicRuntimeConfig.apiUrl);

    if (isLoggedIn && isApiUrl) {
        return { authorization: `${isLoggedIn}` };
    } else {
        return {};
    }

}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if ([401, 403].includes(response.status) && userService.userValue) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                // userService.logout();
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}


function handleError(response) {
    // console.log("errror test", response);
    // console.log("errror test", response.response.status);
    if ([401, 403].includes(response.response.status) && userService.userValue) {
        // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
        // userService.logout();
    }
    const error = (response.response && response.response.data) || response.response.statusText;
    return Promise.reject(error);
}
import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';
import { fetchWrapper } from 'helpers/fetch-wrapper';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}`;
const userSubject = new BehaviorSubject(process.browser && (localStorage.getItem('ust')));
const userProfileSubject = new BehaviorSubject(process.browser && (localStorage.getItem('uspro')));

export const userService = {
    user: userSubject.asObservable(),
    userDetails: userProfileSubject.asObservable(),
    get userValue() { return userSubject.value },
    get userProfileValue() { return userProfileSubject.value },
    login,
    logout,
    getAllusers,
    forgotPassword,
    resetPassword,
    register,
    SetUserStorage,
    getUserDetail,
    updateProfile,
    updatePassword,
    getUserDataList,
    updateStatus
};

function SetUserStorage(val) {
    userSubject.next(val);
    if(val) {
        getUserDetail();
    }
}

function login(data) {
    return fetchWrapper.post(`${baseUrl}/user/auth/login`, data)
        .then((user) => {
            if (user.status) {
                localStorage.setItem('ust' , user.token);
                userSubject.next(user.token);
            } else {
                localStorage.removeItem('ust');
                userSubject.next(null);
            }
            return user;
        });
}

function register(data) {

    return fetchWrapper.post(`${baseUrl}/user/auth/register`, data)
        .then((user) => {
            return user;
        });
}

function forgotPassword(data) {

    return fetchWrapper.post(`${baseUrl}/user/auth/change_password`, data)
        .then((user) => {
            return user;
        });
}

function resetPassword(data) {

    return fetchWrapper.post(`${baseUrl}/user/auth/reset_password`, data)
        .then((user) => {
            return user;
        });
}


function logout() {
    // remove user from local storage, publish null to user subscribers and redirect to login page
    localStorage.removeItem('ust');
    userSubject.next(null);
    localStorage.removeItem('uspro');
    userProfileSubject.next(null);
    location.reload('/authentication/sign-in');
}

function getUserDetail() {
    return fetchWrapper.get(`${baseUrl}/user/profile`)
            .then((user) => {
                if(user.status && user.user) {
                    localStorage.setItem('uspro' , JSON.stringify(user.user));
                    userProfileSubject.next(JSON.stringify(user.user));
                }
                return user;
            });
}

function getAllusers(size, page, search) {
    let url = "";
    if (search) {
        url = `${baseUrl}/users/index?size=${size}&page=${page}&search=${search}`
    }
    else {
        url = `${baseUrl}/users/index?size=${size}&page=${page}`
    }
    return fetchWrapper.get(`${url}`)
}

function updateProfile(data) {
    return fetchWrapper.post(`${baseUrl}/user/update_profile`, data)
    .then((user) => {
        return user;
    });
}

function updatePassword(data) {
    return fetchWrapper.post(`${baseUrl}/user/update_password`, data)
    .then((user) => {
        return user;
    });
}

function getUserDataList() {
    return fetchWrapper.get(`${baseUrl}/user/users_list`)
            .then((user) => {
                return user;
            });
}

function updateStatus(data) {
    return fetchWrapper.post(`${baseUrl}/user/change_userstatus`, data)
    .then((user) => {
        return user;
    });
}

// function getUsers() {

//     const token = JSON.parse(localStorage.getItem("model"));
//     console.log("token : ", token.data);
//     const header = { Authorization: `Bearer ${token.data.token}` };
//     console.log("header : ", header);

//     return axios.get('http://localhost:8000/users', { headers: header })
//         .then((data) => {
//             console.log('developers : ', data);
//             if (data !== "") {
//                 setDevelopers(data.data);
//             }
//         })
//         .catch((error) => {
//             console.log("Error fetching developers : ", error.response.data);
//         })
// }


// function getProjects() {
// const token = JSON.parse(localStorage.getItem("model"));
// console.log("token : ", token.data);
// const header = { Authorization: `Bearer ${token.data.token}` };
// console.log("header : ", header);

// axios.get('http://localhost:8000/projects', { headers: header })
//     .then((data) => {
//         console.log("Projects : ", data);
//         if (data !== "") {
//             setProjects(data.data)
//         }
//     })
//     .catch((error) => {
//         console.log("Error fetching projects : ", error.response.data);
//     })
// }
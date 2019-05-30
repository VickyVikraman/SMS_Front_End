import { API_BASE_HOD_URL, ACCESS_TOKEN, API_BASE_STUDENT_URL, API_BASE_URL } from '../constants';


const request =async (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })
    
    if(localStorage.getItem("accessToken")) {
        console.log(localStorage.getItem("accessToken"))
        headers.append('Authorization', 'Bearer ' + localStorage.getItem("accessToken"))
    }
    

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    let b = await fetch(options.url, options)
    .then(response => 
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return Promise.resolve(json);
        })
    );
    return b;
};

export function login(loginRequest) {
    return request({
        url: API_BASE_HOD_URL + "/signin",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export  function getCurrentUser() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_HOD_URL + "/me",
        method: 'GET'
    });
}

export function studentLogin(loginRequest) {
    return request({
        url: API_BASE_STUDENT_URL + "/signin",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function getCurrentStudent(){
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    return request({
        url: API_BASE_STUDENT_URL + "/me",
        method: 'GET'
    });
}

export  function forgotPassword(forgotPasswordRequest){
    return request({
        
        url: API_BASE_URL + "forgotPwd?email="+forgotPasswordRequest,
        method: 'GET'
        // body: JSON.stringify(forgotPasswordRequest)
    });
}

export default function verifyOtpByEmail(verifyOtpRqst){
    debugger
    return request({
        url: API_BASE_URL + "verifyOtpReqst",
        method: 'POST',
        body: JSON.stringify(verifyOtpRqst)
    });
}
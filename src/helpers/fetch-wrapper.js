import {useAuthStore} from '@/stores/auth.store';

export const fetchWrapper = {
    get: request('GET'),
    post: request('POST'),
    put: request('PUT'),
    delete: request('DELETE')
};

function request(method) {
    return (url, body, {credentials} = {}) => {
        const requestOptions = {
            method,
            headers: addHeader(url)
        };

        if(body) {
            requestOptions.headers['Content-Type'] = 'application/json';
            requestOptions.body = JSON.stringify(body);
        }

        if(credentials) {
            requestOptions.credentials = credentials;
        }

        return fetch(url, requestOptions).then(handleResponse);
    }
}

function addHeader(url) {
    const { user } = useAuthStore();
    const isLoggedIn = !!user?.accessToken;
    const isApiUrl = url.startsWith(import.meta.env.VITE_API_URL);

    if(isLoggedIn && isApiUrl) {
        return {
            Authorization: `Bearer ${user.token}`
        };
    }

    return {};
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);

        if(!response.ok) {
            const { user, logout } = useAuthStore();

            if([401, 403].includes(response.status) && user) {
                logout();
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}
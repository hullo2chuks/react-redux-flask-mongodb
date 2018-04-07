/* eslint camelcase: 0 */

import axios from 'axios';

const tokenConfig = (token) => ({
    headers: {
        'Authorization': token, // eslint-disable-line quote-props
    },
});

export function validate_token(token) {
    return axios.post('/api/v1/is_token_valid', {
        token,
    });
}

export function get_github_access() {
    window.open(
        '/github-login',
        '_blank' // <- This is what makes it open in a new window.
    );
}

export function create_user(email, password) {
    return axios.post('api/v1/create_user', {
        email,
        password,
    });
}

export function get_token(email, password) {
    return axios.post('api/v1/get_token', {
        email,
        password,
    });
}

export function has_github_token(token) {
    return axios.get('api/v1/has_github_token', tokenConfig(token));
}

export function data_about_user(token) {
    return axios.get('api/v1/user', tokenConfig(token));
}

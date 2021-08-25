import axios from 'axios';
import {
    SAVE_PUBLIC,
    BRING_UP_PUBLIC,
    UPDATE_PUBLIC
} from './types';

export function savePublic(dataToSubmit) {
    const request = axios.post('/api/publics/save', dataToSubmit)
    .then(response => response.data)

    return {
        type: SAVE_PUBLIC,
        payload: request
    }
}

export function bringupPublic(dataToSubmit) {
    const request = axios.post('/api/publics/bringup', dataToSubmit)
    .then(response => response.data)

    return {
        type: BRING_UP_PUBLIC,
        payload: request
    }
}

export function updatePublic(dataToSubmit) {
    const request = axios.post('/api/publics/update', dataToSubmit)
    .then(response => response.data)

    return {
        type: UPDATE_PUBLIC,
        payload: request
    }
}
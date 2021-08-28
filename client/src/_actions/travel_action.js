import axios from 'axios';
import {
    GENERTATE_TRAVEL,
    CHECK_DUPLICATE_TRAVEL_ID,
    JOIN_TRAVEL,
    EDIT_PERSONS,
    FIND_MY_TRAVEL,
    DELETE_TRAVEL
} from './types';

export function generateTravel(dataToSubmit) {
    const request = axios.post('/api/travels/generate', dataToSubmit)
    .then(response => response.data)

    return {
        type: GENERTATE_TRAVEL,
        payload: request
    }
}

export function checkDuplicateTravelId(dataToSubmit) {
    const request = axios.post('/api/travels/checkId', dataToSubmit)
    .then(response => response.data)

    return {
        type: CHECK_DUPLICATE_TRAVEL_ID,
        payload: request
    }
}

export function joinTravel(dataToSubmit) {
    const request = axios.post('/api/travels/join', dataToSubmit)
    .then(response => response.data)

    return {
        type: JOIN_TRAVEL,
        payload: request
    }
}

export function editPersons(dataToSubmit) {
    const request = axios.post('/api/travels/editPersons', dataToSubmit)
    .then(response => response.data)

    return {
        type: EDIT_PERSONS,
        payload: request
    }
}

export function findTravel(dataToSubmit) {
    const request = axios.post('/api/travels/find', dataToSubmit)
    .then(response => response.data)

    return {
        type: FIND_MY_TRAVEL,
        payload: request
    }
}

export function deleteTravel(dataToSubmit) {
    const request = axios.post('/api/travels/delete', dataToSubmit)
    .then(response => response.data)

    return {
        type: DELETE_TRAVEL,
        payload: request
    }
}

/*export function getCurrency(dataToSubmit) {
    const request = axios.post('/api/travels/getCurrency', dataToSubmit)
    .then(response => response.data)

    return {
        type: GET_TRAVEL_CURRENCY,
        payload: request
    }
}*/
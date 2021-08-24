import axios from 'axios';
import {
    GENERTATE_TRAVEL,
    CHECK_DUPLICATE_TRAVEL_ID,
    JOIN_TRAVEL
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
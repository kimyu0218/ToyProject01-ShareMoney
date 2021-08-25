import axios from 'axios';
import {
    SAVE_CONSUMPTION,
    BRING_UP_CONSUMPTION,
    UPDATE_CONSUMPTION
} from './types';

export function saveConsumption(dataToSubmit) {
    const request = axios.post('/api/consumptions/save', dataToSubmit)
    .then(response => response.data)

    return {
        type: SAVE_CONSUMPTION,
        payload: request
    }
}

export function bringupConsumption(dataToSubmit) {
    const request = axios.post('/api/consumptions/bringup', dataToSubmit)
    .then(response => response.data)

    return {
        type: BRING_UP_CONSUMPTION,
        payload: request
    }
}

export function updateConsumption(dataToSubmit) {
    const request = axios.post('/api/consumptions/update', dataToSubmit)
    .then(response => response.data)

    return {
        type: UPDATE_CONSUMPTION,
        payload: request
    }
}
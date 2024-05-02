import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';
import { fetchWrapper } from 'helpers/fetch-wrapper';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}`;


export const settingService = {
    getSettings,
    updateSettings,    
};

function getSettings() {
    return fetchWrapper.get(`${baseUrl}/settings/get_settings`)
    .then((data) => {
        return data;
    });
}

function updateSettings(obj) {
    return fetchWrapper.post(`${baseUrl}/settings/update_settings`, obj)
    .then((data) => {
        return data;
    });
}
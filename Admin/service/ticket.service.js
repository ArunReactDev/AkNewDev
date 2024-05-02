import getConfig from 'next/config';
import { fetchWrapper } from 'helpers/fetch-wrapper';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}`;


export const ticketService = {
    createTicket,
    getListTicets,
    updateTickets
};

function createTicket(obj) {
    return fetchWrapper.postFile(`${baseUrl}/support/create_ticket`, obj)
    .then((data) => {
        return data;
    });
}

function getListTicets() {
    return fetchWrapper.get(`${baseUrl}/support/list_tickets`)
    .then((data) => {
        return data;
    });
}

function updateTickets(data) {
    return fetchWrapper.post(`${baseUrl}/support/change_ticketstatus` , data)
    .then((data) => {
        return data;
    });
}
import getConfig from 'next/config';
import { fetchWrapper } from 'helpers/fetch-wrapper';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}`;


export const ticketService = {
    createTicket
};

function createTicket(obj) {
    return fetchWrapper.postFile(`${baseUrl}/support/create_ticket`, obj)
    .then((data) => {
        return data;
    });
}
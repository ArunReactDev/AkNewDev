import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';
import { fetchWrapper } from 'helpers/fetch-wrapper';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}`;


export const portfolioService = {
    generateRecipe,
    subscribePlan,
    getSubscriptionPlans,
    createOrder
};

function generateRecipe(obj) {
    return fetchWrapper.post(`${baseUrl}/recipe/genrate-recipe`, obj)
    .then((data) => {
        return data;
    });
}

function subscribePlan(obj) {
    return fetchWrapper.post(`${baseUrl}/recipe/subscribe`, obj)
    .then((data) => {
        return data;
    });
}

function getSubscriptionPlans() {
    return fetchWrapper.get(`${baseUrl}/recipe/subscription_plans`)
    .then((data) => {
        return data;
    });
}

function createOrder(obj) {
    return fetchWrapper.post(`${baseUrl}/recipe/create_order`, obj)
    .then((data) => {
        return data;
    });
}
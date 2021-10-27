import countryCardTpl from "./template.hbs";
import API from './js/fetchCountries.js';
import { alert, notice, info, success, error, Stack } from '@pnotify/core';
import "@pnotify/core/dist/PNotify.css";
import '@pnotify/core/dist/BrightTheme.css';
import * as Confirm from "@pnotify/confirm";
import "@pnotify/confirm/dist/PNotifyConfirm.css";

const debounce = require('lodash.debounce');
const countryContainer = document.querySelector(".js-country-container");
const input = document.querySelector(".js-input");

function onInputCountry(evt) {
    API(evt.target.value)
    .then(response => {
        return response.json();
    })
    .then(countries => {
        if (countries.length === 1) {
            countryContainer.innerHTML = countryCardTpl(countries[0]);
        }  else if (countries.length >= 2 && countries.length <= 10) {
            countryContainer.innerHTML = countries
            .map(({ name }) => `<li>${name}</li>`)
            .join('');
        } else if (countries.length >= 10) {
            const myStack = new Stack({
                delay: 1000,
                dir1: 'down',
                dir2: 'left',
                mode: 'light',
                firstpos1: 25,
                firstpos: 25,
                spacing1: 36,
                spacing2: 36,
                push: 'top',
                context: document.body,
                positioned: true,
                maxStrategy: 'close'
            });
            const myAlert = alert({
                title: 'Oh no!',
                text: "Too many matches found. Please enter a more specific query",
                type: 'error',
                stack: myStack,
            });
        }
        return countries;
    })
    .catch(error => {
        console.log(error);
    })
};

input.addEventListener('input', debounce(onInputCountry, 500));
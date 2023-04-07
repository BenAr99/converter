import './styles/style.css';
import {getCurrency} from "./request";
import {handleAuthClick, showAuthorizationModal/*под вопросом*/, closeModal,
    swapPlacesValue, searchTable, сurrencyСonversion, createTableCurrency} from './handler';

document.querySelector('.authorization').onclick = handleAuthClick;

// document.querySelector('.close-modal').onclick = closeModal;// ошибка

document.querySelector('.swap-places_img').onclick = swapPlacesValue;

// бд
getCurrency().then(data => {
    сurrencyСonversion(data);

    // введение данных
    createTableCurrency(data);
    document.getElementById('code-search').onkeyup = searchTable;
    document.getElementById('currency-search').onkeyup = searchTable;

    // Cоздание валюты в вкладыше
    document.querySelectorAll('.currency-selection').forEach(item => {
        for (let i = 0; data.currencies.length > i; i++) {
            item.innerHTML += `<option>${data.currencies[i].charCode} - ${data.currencies[i].name}</option>`
        }
    })
})


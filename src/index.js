import './styles/style.css'
import {handleAuthClick, showAuthorizationModal/*под вопросом*/, closeModal,
    swapPlacesValue, searchTable, сurrencyСonversion, createTableCurrency} from './handler'

document.querySelector('.authorization').onclick = handleAuthClick;

// document.querySelector('.close-modal').onclick = closeModal;// ошибка

document.querySelector('.swap-places_img').onclick = swapPlacesValue


export async function postCurrency(body, idBaseCurrency, idConversionCurrency) {
    let response = await fetch(`http://localhost:8080/api/converter?idBaseCurrency=${idBaseCurrency}&idConversionCurrency=${idConversionCurrency}`, {
        method: 'POST', mode: "cors", headers: {
            'Content-Type': 'application/json'
        }, body: JSON.stringify(body)
    });
    let result = await response.json();
    if (response.ok) {
        return result
    } else {
        console.error('Не удалось загрузить валюты');
        return [];
    }
}

const options = {
    method: 'GET', mode: 'cors'
}


async function getCurrency() {
    const response = await fetch('http://localhost:8080/api/', options);
    const data = await response.json()
    if (response.ok) {
        return data

    } else {
        console.error('Не удалось загрузить валюты');
        return [];
    }
}

// бд
getCurrency().then(data => {
    сurrencyСonversion(data)

    // введение данных
    createTableCurrency(data)
    document.getElementById('code-search').onkeyup = searchTable // focus?
    document.getElementById('currency-search').onkeyup = searchTable

    // Cоздание валюты в вкладыше
    document.querySelectorAll('.currency-selection').forEach(item => {
        for (let i = 0; data.currencies.length > i; i++) {
            item.innerHTML += `<option>${data.currencies[i].charCode} - ${data.currencies[i].name}</option>`
        }
    })
})


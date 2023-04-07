import {postCurrency} from "./index";

export function handleAuthClick(event) {
    if (event.target.id === 'log-in') {
        showAuthorizationModal()
    }
}

export function showAuthorizationModal() {
    const limitationInterface = document.createElement('div');
    limitationInterface.className = 'limitation-interface';
    document.querySelector('body').append(limitationInterface);

    const authorizationModal = document.createElement('section');
    authorizationModal.innerHTML = `<div class="authorization-modal">
        <div class="close-modal">&#x2715</div>
        <img class="logo-authorization" src="assets/image/convertor.svg">
        <div class="input-authorization">
        <span>Email</span> <input type="text">
        <span>Password</span> <input type="password"></div>
        <button class="modal-authorization-button modal-authorization-logIn-button">Log In</button>
        <button class="modal-authorization-button google-logo"><img alt="" src="assets/icons/google-logo.svg">Log in with Google </button>
        <button class="modal-authorization-button github-logo"><img alt="" src="assets/icons/github_logo_icon_147285.svg">Log in with GitHub </button>
        <button class="modal-authorization-button facebook-logo"><img alt="" src="assets/icons/facebook-logo.svg">Log in with Facebook </button>
        </div>`
    authorizationModal.className = 'authorization-modal-container';
    document.querySelector('body').prepend(authorizationModal);
}

export function closeModal(e) {
    console.log('1v')
    if (e.target.className === 'close-modal') {
        console.log('2v')
        document.querySelector('.authorization-modal-container').remove();
        document.querySelector('.limitation-interface').remove();
    }
}

export function swapPlacesValue() {
    let firstValueInput = document.getElementById('output_value_from').value;
    let secondValueInput = document.getElementById('output_value_in').value;
    document.getElementById('output_value_from').value = secondValueInput
    document.getElementById('output_value_in').value = firstValueInput
}

export function searchTable(event) {
    let searchText = '';
    if (event.target.id === 'code-search') {
        searchText = document.getElementById('code-search').value;
    }
    if (event.target.id === 'currency-search') {
        searchText = document.getElementById('currency-search').value;
    }
    document.querySelectorAll('tbody tr').forEach(item => {
        if (item.textContent.includes(searchText) === false) {
            item.style.display = 'none'
        }
        else  {
            item.style.display = 'table-row'
        }
    })
}

function idPostRequest(currencies, body, idBaseCurrency, idConversionCurrency, id) {
    for (let i = 0; i < currencies.currencies.length; i++) {
        if (currencies.currencies[i].charCode.includes(idBaseCurrency)) {
            idBaseCurrency = currencies.currencies[i].id
        }

        if (currencies.currencies[i].charCode.includes(idConversionCurrency)) {
            idConversionCurrency = currencies.currencies[i].id
        }
    }
    postCurrency(body, idBaseCurrency, idConversionCurrency).then(data => {
        document.getElementById(id).value = data.exchangeResultAmount
    })
}

function doConverisonOutput(currencies, inputId, selectionId, targetSelectionId, id) {
    return function (){
        const inputValue = document.getElementById(inputId).value;
        const idBaseCurrency = document.getElementById(selectionId).value.slice(0, 3)
        const idConversionCurrency = document.getElementById(targetSelectionId).value.slice(0, 3)
        const dataBoxInput = {
            amount: inputValue,
        }
        idPostRequest(currencies, dataBoxInput, idBaseCurrency, idConversionCurrency, id)
    }
}

export function сurrencyСonversion(currencies) {
    let fromInputConversion = document.getElementById('output_value_in')
    let inInputConversion = document.getElementById('output_value_from')


    let fromSelectConversion = document.getElementById('currency-selection-in')
    let inSelectConversion = document.getElementById('currency-selection-from')
    fromInputConversion.oninput = doConverisonOutput(currencies,'output_value_in', 'currency-selection-in', 'currency-selection-from', 'output_value_from')
    inInputConversion.oninput = doConverisonOutput(currencies,'output_value_from', 'currency-selection-from', 'currency-selection-in', "output_value_in")

    fromSelectConversion.oninput = doConverisonOutput(currencies,'output_value_in', 'currency-selection-in', 'currency-selection-from', 'output_value_from')
    inSelectConversion.oninput = doConverisonOutput(currencies,'output_value_from', 'currency-selection-from', 'currency-selection-in', "output_value_in")
}

export function createTableCurrency(data) {debugger
    const currencyInputData = document.querySelector('tbody');
    for (let i = 0; data.currencies.length - 1 > i; i++) {
        currencyInputData.innerHTML += `<tr id="${i}"><td>${data.currencies[i].charCode}</td>
      <td>${data.currencies[i].name}</td>
      <td>${data.currencies[i].value}</td></tr>`
    }
}
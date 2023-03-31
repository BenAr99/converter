function handleAuthClick(event) {
    if (event.target.id === 'log-in') {
        showAuthorizationModal()
    }
}

function showAuthorizationModal() {
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

    function closeModal(e) {
        if (e.target.className === 'close-modal') {
            document.querySelector('.authorization-modal-container').remove();
            document.querySelector('.limitation-interface').remove();
        }
    }

    document.querySelector('.close-modal').onclick = closeModal;
}

document.querySelector('.authorization').onclick = handleAuthClick;


function swapPlacesValue() {
    let fromValueInput = document.getElementById('output_value_in').value;
    let inValueInput = document.getElementById('output_value_from').value;
    document.getElementById('output_value_in').value = fromValueInput
    document.getElementById('output_value_from').value = inValueInput
}

document.querySelector('.swap-places_img').onclick = swapPlacesValue


async function postCurrency(body, idBaseCurrency, idConversionCurrency) {
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

function idPostRequestFrom(body, idBaseCurrency, idConversionCurrency) {
    getCurrency().then(data => {
        for (let i = 0; i < data.currencies.length; i++) {
            if (data.currencies[i].charCode.includes(idBaseCurrency)) {
                idBaseCurrency = data.currencies[i].id
            }

            if (data.currencies[i].charCode.includes(idConversionCurrency)) {
                idConversionCurrency = data.currencies[i].id
            }
        }
        postCurrency(body, idBaseCurrency, idConversionCurrency).then(data => {
            console.log(data)
            document.getElementById('output_value_from').value = data.exchangeResultAmount
        })
    })
}

function idPostRequestIn(body, idBaseCurrency, idConversionCurrency) {
    getCurrency().then(data => {
        for (let i = 0; i < data.currencies.length; i++) {
            if (data.currencies[i].charCode.includes(idBaseCurrency)) {
                idBaseCurrency = data.currencies[i].id
            }

            if (data.currencies[i].charCode.includes(idConversionCurrency)) {
                idConversionCurrency = data.currencies[i].id
            }
        }
        postCurrency(body, idBaseCurrency, idConversionCurrency).then(data => {
            console.log(data)
            document.getElementById('output_value_in').value = data.exchangeResultAmount
        })
    })
}


function doConverisonOutputfrom() {
    const inputValue = document.getElementById('output_value_in').value;
    const idBaseCurrency = document.getElementById('currency-selection-in').value.slice(0, 3)
    const idConversionCurrency = document.getElementById('currency-selection-from').value.slice(0, 3)
    const dataBoxInput = {
        amount: inputValue,
    }
    idPostRequestFrom(dataBoxInput, idBaseCurrency, idConversionCurrency)
}

function doConversionOutputfrom() {
    const inputValue = document.getElementById('output_value_from').value;
    const idBaseCurrency = document.getElementById('currency-selection-from').value.slice(0, 3)
    const idConversionCurrency = document.getElementById('currency-selection-in').value.slice(0, 3)
    const dataBoxInput = {
        amount: inputValue,
    }
    idPostRequestIn(dataBoxInput, idBaseCurrency, idConversionCurrency)
}

// бд

function сurrencyСonversion() {
    let fromInputConversion = document.getElementById('output_value_in')
    let inInputConversion = document.getElementById('output_value_from')


    let fromSelectConversion = document.getElementById('currency-selection-in')
    let inSelectConversion = document.getElementById('currency-selection-from')
    fromInputConversion.oninput = doConverisonOutputfrom
    inInputConversion.oninput = doConversionOutputfrom

    fromSelectConversion.oninput = doConverisonOutputfrom
    inSelectConversion.oninput = doConversionOutputfrom
}

сurrencyСonversion()

getCurrency().then(data => {
    // введение данных
    function createTableCurrency() {
        const currencyInputData = document.querySelector('tbody');
        for (let i = 0; data.currencies.length - 1 > i; i++) {
            currencyInputData.innerHTML += `<tr id="${i}"><td>${data.currencies[i].charCode}</td>
      <td>${data.currencies[i].name}</td>
      <td>${data.currencies[i].value}</td></tr>`
        }
    }

    createTableCurrency()

    function searchTable(event) {
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

    document.getElementById('code-search').onkeyup = searchTable // focus?
    document.getElementById('currency-search').onkeyup = searchTable

    // Cоздание валюты в вкладыше
    document.querySelectorAll('.currency-selection').forEach(item => {
        for (let i = 0; data.currencies.length > i; i++) {
            item.innerHTML += `<option>${data.currencies[i].charCode} - ${data.currencies[i].name}</option>`
        }
    })
})


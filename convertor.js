// java -jar "C:\Users\getto\Downloads\Telegram Desktop\currencyconverter-0.0.1-SNAPSHOT.jar"
// cd C:\Program Files\Google\Chrome\Application
// chrome.exe --user-data-dir="C://chrome-dev-disabled-security" --disable-web-security --disable-site-isolation-trials
// авторизация
function handleAuthClick(event) {
    if (event.target.id === 'log-in') {
        showAuthorizationModal()
    }
    if (event.target.id === 'sign-in') {
        showSignInModal();
    }
}

function showSignInModal() {
    console.log('in progress')
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
        <button class="modal-authorization-button google-logo"><img src="assets/icons/google-logo.svg">Log in with Google </button>
        <button class="modal-authorization-button github-logo"><img src="assets/icons/github_logo_icon_147285.svg">Log in with GitHub </button>
        <button class="modal-authorization-button facebook-logo"><img src="assets/icons/facebook-logo.svg">Log in with Facebook </button>
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


// textContent это value в html и наоборот? Прочитать крч
function swapPlacesValue () {
    let firstValueInput = document.getElementById('output_value_first').value;
    let secondValueInput = document.getElementById('output_value_second').value;
    document.getElementById('output_value_first').value = secondValueInput
    document.getElementById('output_value_second').value = firstValueInput
}

document.querySelector('.swap-places_img').onclick = swapPlacesValue

//http://localhost:8080/api/converter
async function postCurrency(body, idBaseCurrency, idConversionCurrency) {

    let response = await fetch(`http://localhost:8080/api/converter?idBaseCurrency=${idBaseCurrency}&idConversionCurrency=${idConversionCurrency}`, {
        method: 'POST',
        mode: "cors",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    let result = await response.json();
    if (response.ok) {
        return result
    }
}

const options = {
    method: 'GET',
    mode: 'cors'
}


async function getCurrency(){
    const response = await fetch('http://localhost:8080/api/', options);
    const data = await response.json()
    if (response.ok) {
        return data

    } else {
        alert('wa')
    }

}

function idPostRequestFirst(body, idBaseCurrency, idConversionCurrency) {
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
                document.getElementById('output_value_second').value = data.exchangeResultAmount
        })
    })
}

function idPostRequestSecond(body, idBaseCurrency, idConversionCurrency) {
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
                document.getElementById('output_value_first').value = data.exchangeResultAmount
        })
    })
}


function doConverisonOutputFirst(event) {
        const inputValue = document.getElementById('output_value_first').value;
        const idBaseCurrency = document.getElementById('currency-selection-first').value.slice(0, 3)
        const idConversionCurrency = document.getElementById('currency-selection-second').value.slice(0, 3)
        const dataBoxInput = {
            amount: inputValue,
        }
        idPostRequestFirst(dataBoxInput, idBaseCurrency, idConversionCurrency)
}

function doConversionOutputSecond () {
    const inputValue = document.getElementById('output_value_second').value;
    const idBaseCurrency = document.getElementById('currency-selection-second').value.slice(0, 3)
    const idConversionCurrency = document.getElementById('currency-selection-first').value.slice(0, 3)
    const dataBoxInput = {
        amount: inputValue,
    }
    idPostRequestSecond(dataBoxInput, idBaseCurrency, idConversionCurrency)
}

// бд

// в чем разница onselect && onchange
function сurrencyСonversion (event) {
    let firstInputConversion = document.getElementById('output_value_first')
    let secondInputConversion = document.getElementById('output_value_second')


    let firstSelectConversion = document.getElementById('currency-selection-first')
    let secondSelectConversion = document.getElementById('currency-selection-second')
    firstInputConversion.oninput = doConverisonOutputFirst
    secondInputConversion.oninput = doConversionOutputSecond

    firstSelectConversion.oninput = doConverisonOutputFirst
    secondSelectConversion.oninput = doConversionOutputSecond
}
сurrencyСonversion()

getCurrency().then(data => {
    console.log(data)

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

    function searchTable (event) {
        let poiskText = '';
        if (event.target.id === 'code-search' ) {
            poiskText = document.getElementById('code-search').value;
        }
        if (event.target.id === 'currency-search' ) {
            poiskText = document.getElementById('currency-search').value;
        }
        document.querySelectorAll('tbody tr').forEach(item => {
            if (item.textContent.includes(poiskText) === false) {
                item.style.display = 'none'
            }
            if (item.textContent.includes(poiskText) === true) {
                item.style.display = 'table-row'
            }
        })
    }
    document.getElementById('code-search').onkeyup = searchTable // focus?
    document.getElementById('currency-search').onkeyup = searchTable

    // Выбор валюты в вкладыше
    function currencySelection() {
        document.querySelectorAll('.currency-selection').forEach( item => {
            for (let i = 0; data.currencies.length > i; i++) {
                item.innerHTML +=  `<option>${data.currencies[i].charCode} - ${data.currencies[i].name}</option>`
            }
        })
    }
    currencySelection()

//     function perevodStabliciVoption (event) {
//         let test = document.querySelector('.currency-selection')
//
//             test.value = 'AZN - Азербайджанский манат'
//
//     }
//     document.querySelector('tbody tr').onclick = perevodStabliciVoption
})

// function FET (e) {
//     console.log(document.activeElement.id)
// }
//
// document.querySelector('body').onclick = FET

// КАК БЫЛ ПОИСК И КАК СТАЛ? ЧУСТВУЕШЬ ДА ? ПОЭТОМУ МR СРАЗУ НЕ БЫЛ
// СОКРАЩЕНИЕ КОДА В ЦЕЛЫХ ДВА РАЗА (1,72) БЫЛО (31) СТАЛО (18)
// поиск по таблице
// function search(e) {
//     let searchTableValue = '';
//     let searchVariable = '';
//
//     for (let id = 0; data.currencies.length - 1 > id; id++) {
//         if (e.target.id === 'code-search') {
//             console.log('code')
//             searchVariable = data.currencies[id].charCode
//             searchTableValue = document.getElementById('code-search').value;
//         } else if (e.target.id === 'currency-search') {
//             console.log('currency')
//             searchVariable = data.currencies[id].name
//             searchTableValue = document.getElementById('currency-search').value;
//         }
//
//         if (searchTableValue === searchVariable) { // стоит ли тут использовать case switch?
//             let trueSearch = id;
//             for (let id = 0; data.currencies.length - 1 > id; id++) {
//                 if (trueSearch !== id) {
//                     document.getElementById(`${id}`).style.display = 'none'
//                 }
//             }
//         }
//     }
//     if (searchTableValue === '') {
//         for (let id = 0; data.currencies.length - 1 > id; id++) {
//             document.getElementById(`${id}`).style.display = 'table-row'
//         }
//     }
// }
// document.getElementById('code-search').onkeyup = search // focus?
// document.getElementById('currency-search').onkeyup = search
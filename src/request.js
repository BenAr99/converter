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


export async function getCurrency() {
    const response = await fetch('http://localhost:8080/api/', options);
    const data = await response.json()
    if (response.ok) {
        return data

    } else {
        console.error('Не удалось загрузить валюты');
        return [];
    }
}
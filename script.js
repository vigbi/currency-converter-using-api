window.onload = function () {
    fetchCountries();
}
const apiKey = 'ddb70ca129d89b9dce772c1c';
function fetchCountries() {
    fetch('https://restcountries.com/v3.1/all?fields=name,currencies,flags')
        .then(response => response.json())
        .then(countries => {
            const fromCurrencySelect = document.getElementById('from-currency');
            const toCurrencySelect = document.getElementById('to-currency');
            fromCurrencySelect.innerHTML = '';
            toCurrencySelect.innerHTML = '';
            countries.forEach(country => {
                if (country.currencies) {
                    const currencyCode = Object.keys(country.currencies)[0];
                    const currencyName = country.currencies[currencyCode]?.name || 'Currency Name Not Available';
                    const flagUrl = country.flags ? country.flags.png : '';
                    // const ss= document.getElementById('res')
                    // ss.innerHTML= `<img src="${flagUrl}" style="width: 20px; height: 15px;">`
                    const option = document.createElement('option');
                    option.value = currencyCode;
                    option.innerHTML = `<img src="${flagUrl}" style="width: 20px; height: 15px; margin-right:5px;">${currencyCode}-${currencyName}`;

                    fromCurrencySelect.add(option.cloneNode(true));
                    toCurrencySelect.add(option.cloneNode(true));
                }
            });
            document.getElementById('convertButton').addEventListener('click', convertCurrency);
        })
        .catch(error => console.error(error));
}

function convertCurrency() {
    const amount = document.getElementById('numberInput').value;
    const fromCurrency = document.getElementById('from-currency').value;
    const toCurrency = document.getElementById('to-currency').value;

    const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${fromCurrency}/${toCurrency}/${amount}`;

    fetch(apiUrl)
        .then(response => { return response.json(); })
        .then(data => {
            console.log(data);
            const result = data.conversion_result;
            const resultContainer = document.getElementById('result');
            if (result) {
                resultContainer.textContent = `${amount} ${fromCurrency} = ${result} ${toCurrency}`;
            } else {
                resultContainer.textContent = 'Error: Unable to convert currency.';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            resultContainer.textContent = 'Error: Unable to convert currency.';
        });
}
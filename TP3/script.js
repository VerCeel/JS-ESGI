document.addEventListener('DOMContentLoaded', function() {

    const amountInput = document.getElementById('amount');
    const fromCurrencySelect = document.getElementById('fromCurrency');
    const toCurrencySelect = document.getElementById('toCurrency');
    const resultDiv = document.getElementById('result');
    const errorDiv = document.getElementById('error');
    
    let currencies = [];
    let exchangeRates = {};
    const API_KEY = 'e945447049f31803525e3cad'; 
    
    init();
    
    function init() {
        fetchCurrencies();
        
        amountInput.addEventListener('input', convertCurrency);
        fromCurrencySelect.addEventListener('change', convertCurrency);
        toCurrencySelect.addEventListener('change', convertCurrency);
    }
    
    async function fetchCurrencies() {
        try {
            errorDiv.textContent = '';
            const response = await fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/codes`);
            
            if (!response.ok) {
                throw new Error('Error');
            }
            
            const data = await response.json();
            currencies = data.supported_codes;
            
            populateCurrencySelects();
        } catch (error) {
            errorDiv.textContent = error.message;
            console.error('Erreur:', error);
        }
    }
    
    function populateCurrencySelects() {

        fromCurrencySelect.innerHTML = '';
        toCurrencySelect.innerHTML = '';
        
        currencies.forEach(currency => {
            const [code, name] = currency;
            const optionFrom = document.createElement('option');
            optionFrom.value = code;
            optionFrom.textContent = `${code} - ${name}`;
            
            const optionTo = document.createElement('option');
            optionTo.value = code;
            optionTo.textContent = `${code} - ${name}`;
            
            fromCurrencySelect.appendChild(optionFrom);
            toCurrencySelect.appendChild(optionTo);
        });
        
        if (currencies.some(c => c[0] === 'USD')) {
            fromCurrencySelect.value = 'USD';
        }
        if (currencies.some(c => c[0] === 'EUR')) {
            toCurrencySelect.value = 'EUR';
        }
        
        fetchExchangeRates();
    }
    
    async function fetchExchangeRates() {
        const fromCurrency = fromCurrencySelect.value;
        
        try {
            errorDiv.textContent = '';
            const response = await fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${fromCurrency}`);
            
            if (!response.ok) {
                throw new Error('Error');
            }
            
            const data = await response.json();
            exchangeRates = data.conversion_rates;
            
            convertCurrency();
        } catch (error) {
            errorDiv.textContent = error.message;
            console.error('Erreur:', error);
        }
    }
    
    function convertCurrency() {
        const amount = parseFloat(amountInput.value);
        const fromCurrency = fromCurrencySelect.value;
        const toCurrency = toCurrencySelect.value;
        
        if (isNaN(amount) || amount < 0) {
            resultDiv.textContent = 'Enter a valid amount';
            return;
        }
        
        if (!exchangeRates || !exchangeRates[toCurrency]) {
            resultDiv.textContent = 'Loading...';
            return;
        }
        
        const rate = exchangeRates[toCurrency];
        const result = amount * rate;
        
        resultDiv.innerHTML = `
            <strong>${amount.toFixed(2)} ${fromCurrency}</strong> = 
            <strong style="color: #0066cc;">${result.toFixed(2)} ${toCurrency}</strong>
            <br>
            <small>Taux: 1 ${fromCurrency} = ${rate.toFixed(6)} ${toCurrency}</small>
        `;
    }
});
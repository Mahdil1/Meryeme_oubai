document.addEventListener("DOMContentLoaded", () => {
    fetchMarketData();
});

function fetchMarketData() {
    const apiKey = 'YOUR_API_KEY'; // Get an API key from Alpha Vantage
    const symbol = 'AAPL'; // Example stock symbol (Apple)

    fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            displayMarketData(data);
        })
        .catch(error => console.error('Error fetching market data:', error));
}

function displayMarketData(data) {
    const marketDataDiv = document.getElementById('market-data');
    const latestTime = Object.keys(data['Time Series (5min)'])[0];
    const latestData = data['Time Series (5min)'][latestTime];

    marketDataDiv.innerHTML = `
        <h3>${data['Meta Data']['2. Symbol']} - Latest Market Data</h3>
        <p>Price: $${latestData['1. open']}</p>
        <p>High: $${latestData['2. high']}</p>
        <p>Low: $${latestData['3. low']}</p>
        <p>Volume: ${latestData['5. volume']}</p>
    `;
}

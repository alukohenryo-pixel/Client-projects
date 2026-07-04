/* ==========================================================
   CoinsWise Live Rates
   Powered by CoinGecko API
   Developed by GBBM Digital Solutions
========================================================== */

const API_URL =
"https://api.coingecko.com/api/v3/coins/markets?vs_currency=ngn&ids=bitcoin,ethereum,tether,binancecoin&order=market_cap_desc&per_page=4&page=1&sparkline=false";

/* ==========================================
   DOM
========================================== */

const ratesBody = document.getElementById("rates-body");

/* ==========================================
   Currency Formatter
========================================== */

function formatNGN(value) {

    return new Intl.NumberFormat("en-NG", {

        style: "currency",

        currency: "NGN",

        minimumFractionDigits: 0,

        maximumFractionDigits: 0

    }).format(value);

}

/* ==========================================
   Buy / Sell Calculation

   Temporary logic.

   Replace with backend values later.
========================================== */

function calculateBuy(price) {

    return price * 1.005;

}

function calculateSell(price) {

    return price * 0.995;

}

/* ==========================================
   Percentage Class
========================================== */

function percentageClass(value) {

    return value >= 0 ? "green" : "red";

}

/* ==========================================
   Percentage Display
========================================== */

function percentageValue(value) {

    const sign = value >= 0 ? "+" : "";

    return `${sign}${value.toFixed(2)}%`;

}

/* ==========================================
   Build Table Row
========================================== */

function buildRow(coin) {

    const buyPrice = calculateBuy(coin.current_price);

    const sellPrice = calculateSell(coin.current_price);

    return `

<tr>

<td>

<div class="coin-info">

<img
src="${coin.image}"
alt="${coin.name}">

<div>

<strong>${coin.name}</strong>

<span>${coin.symbol.toUpperCase()}</span>

</div>

</div>

</td>

<td>

${formatNGN(buyPrice)}

</td>

<td>

${formatNGN(sellPrice)}

</td>

<td class="${percentageClass(coin.price_change_percentage_24h)}">

${percentageValue(coin.price_change_percentage_24h)}

</td>

<td>

<a href="https://wa.me/234XXXXXXXXXX"

target="_blank"

class="trade-btn">

Buy / Sell

</a>

</td>

</tr>

`;

}

/* ==========================================
   Loading State
========================================== */

function loadingState() {

    ratesBody.innerHTML = `

<tr>

<td colspan="5"

style="text-align:center;padding:40px;">

Loading live market rates...

</td>

</tr>

`;

}

/* ==========================================
   Error State
========================================== */

function errorState() {

    ratesBody.innerHTML = `

<tr>

<td colspan="5"

style="text-align:center;padding:40px;color:#d9534f;">

Unable to load live rates.

Please try again shortly.

</td>

</tr>

`;

}

/* ==========================================
   Fetch Rates
========================================== */

async function fetchRates() {

    loadingState();

    try {

        const response = await fetch(API_URL);

        if (!response.ok) {

            throw new Error("Network response was not successful.");

        }

        const data = await response.json();

        ratesBody.innerHTML = "";

        data.forEach((coin) => {

            ratesBody.innerHTML += buildRow(coin);

        });

    }

    catch (error) {

        console.error(error);

        errorState();

    }

}

/* ==========================================
   Initialize
========================================== */

fetchRates();

/* ==========================================
   Refresh Every Minute
========================================== */

setInterval(fetchRates, 60000);
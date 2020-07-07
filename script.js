const exchangeRate2Vnd = { 'usd': 23232, 'eur': 26240, 'jpy': 215.859, 'vnd': 1 };
let exchangeRates2Vnd = {};

/*
This function get the currency rates through API
*/
async function callAPI() {
  let url = "https://data.fixer.io/api/latest?access_key=c00e15cca5a9a358410b21fe863681b1"
  let response = await fetch(url);
  if (response.ok) {
    let data = await response.json();
    exchangeRates2Vnd = data['rates'];
  }
}
callAPI();

/*
This function is used to format the output
*/
function formatCurrency(type, value) {
  const formatter = new Intl.NumberFormat(type, {
    currency: type,
    style: "currency"
  });
  return formatter.format(value);
}

/*
This function is used to convert from 1 currency to another currency
*/
function converter() {
  let from = document.getElementById('from').value.toUpperCase();
  let to = document.getElementById('to').value.toUpperCase();
  let amount = parseInt(document.getElementById('dn-input-text').value);

  if (amount < 0) {
    alert("The input value cannot be negative");
    document.getElementById('dn-input-text').value = '';
    return null;
  } else if (isNaN(amount)) {
    alert("The input value is not a number");
    document.getElementById('dn-input-text').value = '';
    return null;
  }
  convert_amount = amount / exchangeRates2Vnd[from] * exchangeRates2Vnd[to];
  output = formatCurrency(from, amount) + " = " + formatCurrency(to, convert_amount.toFixed(2));
  document.getElementById("dn-output-text").innerHTML = output; // innerHTML has to be String value
}

/*
This function is used to reverse the values appeared in the dropdown list
*/
function reverse() {
  let from = document.getElementById("from").value;
  let to = document.getElementById("to").value;
  document.getElementById("from").value = to;
  document.getElementById("to").value = from;
}

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content
*/
function UpdateCurrency() {
  cur_abbr = ['USD','EUR','JPY','AED','INR'];
  cur = ['US Dollar', 'Euro', 'Japanese Yen', 'Emirati Dirham', 'Indian Rupee'];
  ids = ['line1', 'line2', 'line3', 'line4', 'line5'];
  for (i=0; i<cur_abbr.length; i++){
    let toVND = 1 / exchangeRates2Vnd[cur_abbr[i]] * exchangeRates2Vnd['VND'];
    toVND = toVND.toFixed(2);
    document.getElementById(ids[i]).innerHTML = `${cur[i]}: 1 ${cur_abbr[i]} = ${toVND} VND`;
  }
}

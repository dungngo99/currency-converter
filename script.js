let exchangeRates2Vnd = {}
let api_data = {}

/*
Function to make sure that the program calls function sequentially. Recall: await assures that callAPI() has to return first before calling updateDropDown(). Without await, updateDropDown() may be called in the halfway of callAPI
*/
async function UpdateData() {
  await callAPI();
  updateDropDown();
}
UpdateData()

/*
This function get the currency rates through API
*/
async function callAPI() {
  let endpoints = ['latest', 'convert', 'timeseries', 'fluctuation']
  let access_key = 'c00e15cca5a9a358410b21fe863681b1';
  let callback = null;
  let attrs = {
    'latest': [,'base', 'symbols'], 
    'convert': ['from', 'to', 'amount', 'date'], 
    'timeseries': ['start-date', 'end-date','base','symbols'], 
    'fluatuation': ['start-date', 'end-date','base','symbols']
  }

  let url = `https://data.fixer.io/api/${endpoints[0]}?access_key=${access_key}&${attrs['latest'][0]}=EUR`
  //url = 'https://v6.exchangerate-api.com/v6/78fb296ea3727f08458e03ac/latest/USD'
  //Link to Fixer API documentation: https://fixer.io/documentation
  //Link to ExchangeRate API documentation: https://www.exchangerate-api.com/docs/overview (has https)

  try {
    let response = await fetch(url);
    let data = await response.json();
    api_data = data
    console.log(data);
    if (data['success']) {
      exchangeRates2Vnd = data['rates'];
    } else {
      exchangeRates2Vnd = {
        'USD': 1.4,
        'EUR': 1,
        'JPY': 332.1,
        'VND': 26445,
        'INR': 3423,
        'AED': 344.34,
      };
    }
  } catch (err) {
    console.log("Failed to connect to API");
    exchangeRates2Vnd = {
      'USD': 1.4,
      'EUR': 1,
      'JPY': 332.1,
      'VND': 26445,
      'INR': 3423,
      'AED': 344.34,
    };
  }
  //console.log(exchangeRates2Vnd);
}

/*
Function to update the drop down list. Create new element in js and add it as a child to select tag
Resources: W3 School HTML DOM Documentation
*/
function updateDropDown(){
  let from = document.getElementById('from');
  for (let key in api_data['rates']){
    let child = document.createElement('option');
    child.text = key;
    from.add(child);
  }

  let to = document.getElementById('to');
  for (let key in api_data['rates']){
    let child = document.createElement('option');
    child.text = key;
    to.add(child);
  }
}

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
  cur_abbr = ['USD', 'EUR', 'JPY', 'AED', 'INR'];
  cur = ['US Dollar', 'Euro', 'Japanese Yen', 'Emirati Dirham', 'Indian Rupee'];
  ids = ['line1', 'line2', 'line3', 'line4', 'line5'];
  for (i = 0; i < cur_abbr.length; i++) {
    let toVND = 1 / exchangeRates2Vnd[cur_abbr[i]] * exchangeRates2Vnd['VND'];
    toVND = toVND.toFixed(2);
    document.getElementById(ids[i]).innerHTML = `${cur[i]}: 1 ${cur_abbr[i]} = ${toVND} VND`;
  }

  if (api_data['success']){
    document.getElementById('dn-date').innerText = `Date: ${api_data['date']}`;
    document.getElementById('dn-base').innerText = `Base: ${api_data['base']}`;
    document.getElementById('dn-api').innerText = `Connected to API: ${api_data['success']}`;
  }else{
    document.getElementById('dn-date').innerText = "Date: Not available";
    document.getElementById('dn-base').innerText = "Base: Not available. Use redefined rates";
    document.getElementById('dn-api').innerText = `Connected to API: ${api_data['success']}. Error: ${api_data['error']['type']}`;
  }
}
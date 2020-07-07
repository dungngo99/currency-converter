const exchangeRate2Vnd = {'usd':23232, 'eur':26240, 'jpy':215.859, 'vnd':1};

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
function converter(){
  let from = document.getElementById('from').value;
  let to = document.getElementById('to').value;
  let amount = parseInt(document.getElementById('dn-input-text').value);

  if (amount < 0){
    alert("The input value cannot be negative");
    return null;
  }else if(isNaN(amount)){
    alert("The input value is not a number");
    return null;
  }
  
  convert_amount = amount * exchangeRate2Vnd[from] / exchangeRate2Vnd[to];
  output = formatCurrency(from.toUpperCase(), amount) + " = " + formatCurrency(to.toUpperCase(), convert_amount.toFixed(2));
  document.getElementById("dn-output-text").innerHTML = output; // innerHTML has to be String value
}

/*
This function is used to reverse the values appeared in the dropdown list
*/
function reverse() {
  let from = document.getElementById("from").value;
  let to = document.getElementById("to").value;
  document.getElementById("from").value = to
  document.getElementById("to").value = from
}

/*
1. Use Quokka to check the result of a function or variable
2. Equivalent: <button onclick='myFunction'></button> is equal to <script>document.getElementById("id here").addEventListener('type of event', myFunction())</script>
3. To convert from String to Number, use parseInt() (if NaN, return NaN) or Number() (if NaN, return 0) method as above
4. isNaN() is used to check if a number is NaN
5. To change a current value appearing in dropdown list: we use document.getElementById("id here").value = new value
6. We can see the ouput of console.log() in browser (Inspect element -> Console. Run the js file->Click on button to call function->Output showed in Console)
7. Use querySelector with its attributes: 
let var = document.querySelector('tagElement[attr1="value1"]:checked').value;
8. Show a value of a variable in a String: (use backticks `` and ${}). Ex:
document.getElementById('id here').innerHTML = `A String here ${variable}`
*/
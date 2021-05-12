// Check authentication
fetch('./api/balance', {
    "headers": {
        "Authorization": "Bearer " + localStorage.getItem('token')
    }
}).then(result => {
    return result.json();
}).then(json => {
    console.log(json);
    let balance = document.querySelector('.balance-amount');
    balance.innerHTML = json.data.balance;
}).catch(err => {
    console.log("You are unauthorized.")
    window.location.href = './login';
});
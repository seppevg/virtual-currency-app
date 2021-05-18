// Check authentication and get balance
fetch('./api/balance', {
    "headers": {
        "Authorization": "Bearer " + localStorage.getItem('token')
    }
}).then(result => {
    return result.json();
}).then(json => {
    let balance = document.querySelector('.balance-amount');
    balance.innerHTML = json.data.balance;
}).catch(err => {
    console.log("You are unauthorized.")
    window.location.href = './login';
});

// Get recent transactions
const transactionList = document.querySelector('.transactions');
fetch('./api/transfers', {
    "headers": {
        "Authorization": "Bearer " + localStorage.getItem('token')
    }
}).then(result => {
    return result.json();
}).then(json => {
    json.data.transfers.forEach((transfer, index) => {
        let html = '';

        // Separator
        if(index > 0) 
            html += '<img class="separator" src="/images/separatorline.svg" alt="separator line">';

        if(transfer.amount > 0) { // Geld ontvangen
            html +=
            `<div class='transaction'>
                <img class='icon--transaction' src="/images/orange_transaction.svg" alt="transaction">
                <div class='transaction-info'>
                    <p class='transaction-name'>${ transfer.receiver.name }</p>
                    <p class='transaction-time'>${ transfer.date }</p>
                </div>
                <p class='transaction-amount transaction-amount--positive'><span class='money'>+${ transfer.amount }</span> MLA</p>
            </div>`
        } else { // Geld gestort
            html += `
            <div class='transaction'>
                <img class='icon--transaction' src="/images/orange_transaction.svg" alt="transaction">
                <div class='transaction-info'>
                    <p class='transaction-name'>${ transfer.receiver.name }</p>
                    <p class='transaction-time'>${ transfer.date }</p>
                </div>
                <p class='transaction-amount transaction-amount--negative'><span class='money'>${ transfer.amount }</span> MLA</p>
            </div>`
        }
        transactionList.innerHTML += html;
    })
}).catch(err => {
-   console.log("error");
});
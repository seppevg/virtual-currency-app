const transactionName = document.querySelector("#transaction_name");
const transactionAmount = document.querySelector("#transaction_amount");
const transactionType = document.querySelector("#transaction_type");
const transactionComment = document.querySelector("#transaction_comment");
const transactionButton = document.querySelector(".button--sendTransaction");
const popUp = document.querySelector('.popup');
const btnPopUp = document.querySelector('.button--popup');

transactionButton.addEventListener('click', (e) => {
    let receiver = transactionName.value;
    let amount = transactionAmount.value;
    let type = transactionType.value;
    let comment = transactionComment.value;

    fetch('./api/transfers', {
        method: "post",
        headers: {
            "Content-Type": 'application/json',
            "Authorization": "Bearer " + localStorage.getItem('token')
        },
        body: JSON.stringify({
            "receiver": receiver,
            "amount": amount,
            "reason": type,
            "comment": comment
        })
    }).then(response => {
        return response.json();
    }).then(json => {
        if (json.status === 'success') {
            let amount = json.data.transfer.amount;
            fetch('./api/balance', {
                method: "get",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem('token')
                }
            }).then(result => {
                return result.json();
            }).then(json => {
                let balance = json.data.balance;
                balance -= amount;

                fetch('./users/login', {
                    method: "post",
                    headers: {
                        "Content-Type": 'application/json',
                        "Authorization": "Bearer " + localStorage.getItem('token')
                    },
                    body: JSON.stringify({
                        "balance": balance
                    })
                }).then(result => {
                    return result.json();
                }).then(json => {
                    window.location.href = './';
                }).catch(err => {
                    console.log(err);
                });
            }).catch(err => {
                console.log(err)
            });
        }
        else {
            // Transaction failed
            showPopUp("Transaction failed", json.message);
        }
    }).catch(err => {
        console.log(err);
    });
});

// Pop up handler
function showPopUp(title, message) {
    // make visible
    popUp.classList.add('popup--visible');

    //set contents
    document.querySelector('.popup-title').innerHTML = title;
    document.querySelector('.popup-text').innerHTML = message;
}
btnPopUp.addEventListener('click', closePopUp);
function closePopUp() {
    // make invisible
    popUp.classList.remove('popup--visible');
}
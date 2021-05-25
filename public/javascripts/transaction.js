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
            //Transaction succes
            window.location.href = './';
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
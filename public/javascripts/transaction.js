const transactionName = document.querySelector("#transaction_name");
const transactionAmount = document.querySelector("#transaction_amount");
const transactionType = document.querySelector("#transaction_type");
const transactionComment = document.querySelector("#transaction_comment");
const transactionButton = document.querySelector(".button--sendTransaction");
transactionButton.addEventListener('click', (e) => {
    let receiver = transactionName.value;
    let amount = transactionAmount.value;
    let type = transactionType.value;
    let comment = transactionComment.value;
    fetch('./api/transfers', {
        "method": "post",
        "headers": {
            "Authorization": "Bearer " + localStorage.getItem('token')
        },
        "body": JSON.stringify({
            "receiver": receiver,
            "amount": amount,
            "type": type,
            "comment": comment
        })
    }).then(result => {
        return result.json();
    }).then(json => {
        console.log(json);
    }).catch(err => {
        console.log(err);
    });
});
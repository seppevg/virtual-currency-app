const transactionName = document.querySelector("#transaction_name");
const transactionAmount = document.querySelector("#transaction_amount");
const transactionType = document.querySelector("#transaction_type");
const transactionComment = document.querySelector("#transaction_comment");
const transactionButton = document.querySelector(".button--sendTransaction");
const popUp = document.querySelector('.popup');
const btnPopUp = document.querySelector('.button--popup');
const autocompleteList = document.querySelector(".autocomplete-list");

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
            console.log("Sending transfer");
            primus.write({
                type: "transfer",
                data: {},
            });
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

//Autocomplete input search
transactionName.addEventListener('input', (e) => {
    let inputName = transactionName.value;
    fetch('./users/findusers', {
        method: "post",
        headers: {
            "Content-Type": 'application/json',
            "Authorization": "Bearer " + localStorage.getItem('token')
        },
        body: JSON.stringify({
            "input": inputName
        })
    }).then(response => {
        return response.json();
    }).then(json => {
        if (json.data.users.length > 0 && inputName != "") {
            autocompleteList.innerHTML = "";
            json.data.users.forEach(user => {
                let p = document.createElement("p");
                p.innerHTML = user.name;
                autocompleteList.appendChild(p);
                p.addEventListener('click', (e) => {
                    transactionName.value = p.innerHTML;
                    autocompleteList.style.display = "none";
                });
            });
            autocompleteList.style.display = "block";
        } else {
            autocompleteList.style.display = "none";
        }
        return json;
    }).catch(err => {
        console.log(err);
    });
});

// Primus
// Connect to server
let primus = Primus.connect('', {
    reconnect: {
        max: Infinity // Number: The max delay before we try to reconnect.
        , min: 500 // Number: The minimum delay before we try reconnect.
        , retries: 10 // Number: How many times we should try to reconnect.
    }
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
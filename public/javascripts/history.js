// Get all transactions
const transactionList = document.querySelector('.transactions');
fetch('./api/transfers', {
    "headers": {
        "Authorization": "Bearer " + localStorage.getItem('token')
    }
}).then(result => {
    return result.json();
}).then(json => {
    json.data.transfers.reverse().forEach((transfer, index) => {
        // Separator
        if(index > 0) 
            transactionList.innerHTML += '<img class="separator" src="/images/separatorline.svg" alt="separator line">';

        // Get icon color based on transfer reason
        switch(transfer.reason) {
            case "Development help":
                transactionClass = "icon-orange";
                break;
            case "Design help":
                transactionClass = "icon-blue";
                break;
            case "Feedback":
                transactionClass = "icon-red";
                break;
            case "Meeting deadlines":
                transactionClass = "icon-green";
                break;
            default:
                transactionClass = "icon-purple";
                break;
        }

        let transferElement = document.createElement('div')
        transferElement.classList.add('list__item');
        transferElement.setAttribute('comment', transfer.comment);

        if(transfer.amount > 0) { // Geld ontvangen
            transferElement.innerHTML += `
                <div class='list__item--icon ${ transactionClass }'></div> 
                <div class='list__item-info'>
                    <p class='list__item--name'>${ transfer.receiver.name }</p>
                    <p class='list__item--subtext'>${ timeSince(new Date(transfer.date)) } ago</p>
                </div>
                <p class='list__item--amount list__item--amount--positive'><span class='money'>+${ transfer.amount }</span> MLA</p>`
        } else { // Geld gestort
            transferElement.innerHTML  += `
                <div class='list__item--icon ${ transactionClass }'></div> 
                <div class='list__item-info'>
                    <p class='list__item--name'>${ transfer.receiver.name }</p>
                    <p class='list__item--subtext'>${ timeSince(new Date(transfer.date)) } ago</p>
                </div>
                <p class='list__item--amount list__item--amount--negative'><span class='money'>${ transfer.amount }</span> MLA</p>`
        }
        transactionList.append(transferElement);
    })

    // Make clickable voor comments
    document.querySelectorAll('.transactions .list__item').forEach(transferElement => {
        transferElement.addEventListener('click', (e) => {
            if(transferElement.getAttribute('comment') == 'undefined')
                showPopUp('Transaction comment', '<i>No comment was added to this transaction.</i>');
            else
                showPopUp('Transaction comment', transferElement.getAttribute('comment'));
        })
    });
}).catch(err => {
-   console.log("error");
});

// Help icon interaction
const iconHelp = document.querySelector('.icon--help--history');
iconHelp.addEventListener('click', (e) => {
    showPopUp("Reason colors", 
        `<ul class='color-list'>
            <li><div class='icon icon-orange'></div>Development help</li>
            <li><div class='icon icon-blue'></div>Design help</li>
            <li><div class='icon icon-red'></div>Feedback</li>
            <li><div class='icon icon-green'></div>Meeting deadlines</li>
            <li><div class='icon icon-purple'></div>Other</li>
        </ul>`
    );
})


/* HELPER FUNCTIONS */
// Time converter function
function timeSince(date) {
    var seconds = Math.floor((new Date() - date) / 1000);
  
    var interval = seconds / 31536000;
  
    if (interval > 1) {
      return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  }
  var aDay = 24*60*60*1000;

// Pop up handler
const popUp = document.querySelector('.popup');
const btnPopUp = document.querySelector('.button--popup');
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
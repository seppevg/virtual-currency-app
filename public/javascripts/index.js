// Check authentication
fetch('./', {
    "headers": {
        "Authorization": "Bearer " + localStorage.getItem('token')
    }
}).then(result => {
    return result.json();
}).then(json => {
    console.log(json);
}).catch(err => {
    console.log("You are unathorized.")
});
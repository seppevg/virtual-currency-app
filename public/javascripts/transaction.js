fetch('./transaction', {
    method: 'get',
    headers: {
        'Content-Type': 'application/json'
    }
}).then(result => {
    return result.json();
}).then(json => {
    console.log(json);
}).catch(err => {
    console.log(err);
});
const fieldEmail = document.querySelector('#email');
const fieldPassword = document.querySelector('#password');
const btnLogin = document.querySelector('.button--login');

btnLogin.addEventListener('click', validateLogin);

function validateLogin() {
    let email = fieldEmail.value;
    let password = fieldPassword.value;

    fetch('./api/login', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "email": email,
            "password": password,
        })
    })
    .then(response => response.json())
    .then(json => {
        if(json.status == 'success') {
            // Logged in
            window.location.href = './';
        } else {
            // Login failed
            // todo: show pop-up
        }
    });
}
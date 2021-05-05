const fieldName = document.querySelector('#name');
const fieldEmail = document.querySelector('#email');
const fieldPassword = document.querySelector('#password');
const btnSignup = document.querySelector('.button--signup');

btnSignup.addEventListener('click', signUp);

function signUp() {
    let name = fieldName.value;
    let email = fieldEmail.value;
    let password = fieldPassword.value;

    fetch('./api/signup', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "name": name,
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
            // Sign up failed
            console.log(json.message);
        }
    });
}
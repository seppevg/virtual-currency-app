const fieldName = document.querySelector('#name');
const fieldEmail = document.querySelector('#email');
const fieldPassword = document.querySelector('#password');
const btnSignup = document.querySelector('.button--signup');

btnSignup.addEventListener('click', signUp);

function signUp() {
    let name = fieldName.value;
    let email = fieldEmail.value;
    let password = fieldPassword.value;

    fetch('./users/signup', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "name": name,
            "email": email,
            "password": password,
        })
    }).then(response => {
        return response.json();
    }).then(json => {
        if (json.status === 'success') {
            // Sign up success
            let token = json.data.token;
            localStorage.setItem("token", token);
            window.location.href = './';
        }
        else {
            // Sign up failed
            console.log(json.message);
        }
    });
}
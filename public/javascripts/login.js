const fieldEmail = document.querySelector('#email');
const fieldPassword = document.querySelector('#password');
const btnLogin = document.querySelector('.button--login');
const btnEye = document.querySelector('.eye');

btnLogin.addEventListener('click', validateLogin);
function validateLogin() {
    let email = fieldEmail.value;
    let password = fieldPassword.value;

    fetch('./users/login', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "email": email,
            "password": password,
        })
    }).then(response => {
        return response.json();
    }).then(json => {
        if (json.status === 'success') {
            // Login success
            let token = json.data.token;
            localStorage.setItem("token", token);
            window.location.href = './';
        } else {
            // Login failed
            // show pop-up message
            console.log(json.message);
        }
    });
}

// Password toggle
btnEye.addEventListener('click', togglePasswordVisibility);
function togglePasswordVisibility() {
    if(fieldPassword.type == "password") {
        fieldPassword.type = "text";
        btnEye.src = "/images/eye_open.svg";
    } else {
        fieldPassword.type = "password";
        btnEye.src = "/images/eye.svg";
    }
} 
const fieldName = document.querySelector('#name');
const fieldEmail = document.querySelector('#email');
const fieldPassword = document.querySelector('#password');
const btnSignup = document.querySelector('.button--signup');
const btnEye = document.querySelector('.eye');
const popUp = document.querySelector('.popup');
const btnPopUp = document.querySelector('.button--popup');

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
            showPopUp("Signup failed", json.message);
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
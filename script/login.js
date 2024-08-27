"use strict";

const loginForm = document.querySelector("#login");

loginForm.onsubmit = function (event) {
    // Prevent the form from refreshing the page,
    // as it will do by default when the Submit event is triggered:
    event.preventDefault();

    // We can use loginForm.username (for example) to access
    // the input element in the form which has the ID of "username".
    const loginData = {
        username: loginForm.username.value,
        password: loginForm.password.value,
    }
        if (loginData.username && loginData.password) {
            loginForm.loginButton.disabled = true;
            login(loginData);
        } else {
            alert("Please fill in both fields.");
        
    }
};

//     // Disables the button after the form has been submitted already:
//     loginForm.loginButton.disabled = true;

//     // Time to actually process the login using the function from auth.js!
//     login(loginData);
// };

const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".custom-container");

sign_up_btn.addEventListener('click', () => {
    container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener('click', () => {
    container.classList.remove("sign-up-mode");
});


// New code for signup form submission handling
const signupForm = document.querySelector("#signup");

signupForm.onsubmit = function (event) {
    event.preventDefault();

    const signupData = {
        username: signupForm.username.value,
        fullname: signupForm.fullname.value,
        password: signupForm.password.value,
    };

    signupForm.signUpButton.disabled = true;

    signup(signupData).then(() => {
        signupForm.signUpButton.disabled = false;
    });
};

function scrollToSignup() {
    const signupSection = document.getElementById('signup-section');
    signupSection.scrollIntoView({ behavior: 'smooth' });
}
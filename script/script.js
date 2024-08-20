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

    // Disables the button after the form has been submitted already:
    loginForm.loginButton.disabled = true;

    // Time to actually process the login using the function from auth.js!
    login(loginData);
};

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

document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll('.metrictextnumber');

    const updateCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        const current = +counter.innerText;
        const increment = Math.ceil(target / 200); // Adjust this for speed

        if (current < target) {
            counter.innerText = current + increment;
            setTimeout(() => updateCounter(counter), 10);
        } else {
            counter.innerText = target;
        }
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                if (counter.innerText == "0") { // Ensures it only animates once
                    updateCounter(counter);
                }
                observer.unobserve(counter); // Stop observing after animation
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        // Set initial count to 0
        counter.innerText = "0";
        observer.observe(counter);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const filters = document.querySelectorAll('#portfolio-filters li');
    const items = document.querySelectorAll('.portfolio-item');

    filters.forEach(filter => {
        filter.addEventListener('click', function() {
            // Remove active class from all filters
            filters.forEach(f => f.classList.remove('active'));
            // Add active class to the clicked filter
            this.classList.add('active');

            // Get the filter category
            const filterValue = this.getAttribute('data-filter');

            // Show/Hide items based on the filter
            items.forEach(item => {
                if (filterValue === '*' || item.classList.contains(filterValue.substring(1))) {
                    item.style.display = 'block';
                    item.classList.add('animate__fadeIn');  // Optional: Add animation class
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
});
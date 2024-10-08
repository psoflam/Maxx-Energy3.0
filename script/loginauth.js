/* auth.js provides LOGIN-related functions */

"use strict";

const apiBaseURL = "http://microbloglite.us-east-2.elasticbeanstalk.com";
// Backup server (mirror):   "https://microbloglite.onrender.com"

// NOTE: API documentation is available at /docs 
// For example: http://microbloglite.us-east-2.elasticbeanstalk.com/docs


// You can use this function to get the login data of the logged-in
// user (if any). It returns either an object including the username
// and token, or an empty object if the visitor is not logged in.
function getLoginData () {
    const loginJSON = window.localStorage.getItem("login-data");
    return JSON.parse(loginJSON) || {};
}


// You can use this function to see whether the current visitor is
// logged in. It returns either `true` or `false`.
function isLoggedIn () {
    const loginData = getLoginData();
    return Boolean(loginData.token);
}


// This function is already being used in the starter code for the
// landing page, in order to process a user's login. READ this code,
// and feel free to re-use parts of it for other `fetch()` requests
// you may need to write.

function login(loginData) {
    return new Promise((resolve, reject) => {
        // Retrieve user data
        const storedUser = JSON.parse(localStorage.getItem(loginData.username));

        if (storedUser) {
            // Compare the input password with the stored password
            if (loginData.password === storedUser.password) {
                // Redirect to the correct page
                window.location.replace("/data.html"); // Correct path
                resolve();
            } else {
                reject("Login failed: Incorrect username or password");
            }
        } else {
            reject("Login failed: User does not exist");
        }
    }).catch(error => {
        console.error(error);
        alert(error); // Display the error to the user
    });
}
// function login (loginData) {
//     // POST /auth/login
//     const options = { 
//         method: "POST",
//         headers: {
//             // This header specifies the type of content we're sending.
//             // This is required for endpoints expecting us to send
//             // JSON data.
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(loginData),
//     };

//     return fetch(apiBaseURL + "/auth/login", options)
//         .then(response => response.json())
//         .then(loginData => {
//             if (loginData.message === "Invalid username or password") {
//                 console.error(loginData)
//                 // Here is where you might want to add an error notification 
//                 // or other visible indicator to the page so that the user is  
//                 // informed that they have entered the wrong login info.
//                 return null
//             }

//             window.localStorage.setItem("login-data", JSON.stringify(loginData));
//             window.location.assign("/posts/posts.html");  // redirect

//             return loginData;
//         });
// }


// This is the `logout()` function you will use for any logout button
// which you may include in various pages in your app. Again, READ this
// function and you will probably want to re-use parts of it for other
// `fetch()` requests you may need to write.
function logout () {
    const loginData = getLoginData();

    // GET /auth/logout
    const options = { 
        method: "GET",
        headers: { 
            // This header is how we authenticate our user with the
            // server for any API requests which require the user
            // to be logged-in in order to have access.
            // In the API docs, these endpoints display a lock icon.
            Authorization: `Bearer ${loginData.token}`,
        },
    };

    fetch(apiBaseURL + "/auth/logout", options)
        .then(response => response.json())
        .then(data => console.log(data))
        .finally(() => {
            // We're using `finally()` so that we will continue with the
            // browser side of logging out (below) even if there is an 
            // error with the fetch request above.

            window.localStorage.removeItem("login-data");  // remove login data from LocalStorage
            window.location.assign("/");  // redirect back to landing page
        });
}


function signup(signupData) {
    return new Promise((resolve, reject) => {
        // Simulate saving user data
        const user = {
            username: signupData.username,
            password: signupData.password // Make sure this is correctly handled
        };

        localStorage.setItem(user.username, JSON.stringify(user));

        window.location.replace("/log.html");

        resolve();
    }).catch(error => {
        console.error("Signup error:", error);
        alert("Signup failed. Please try again.");
    });
}

// Function to handle user signup
// function signup(signupData) {
//     const options = {
//         method: "POST",
//         headers: {
//             "accept": "application/json",
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//             username: signupData.username,
//             fullName: signupData.fullname,
//             password: signupData.password
//         }),
//     };

//     return fetch(apiBaseURL + "/api/users", options)
//         .then(response => response.json())
//         .then(signupData => {
//             if (signupData.message) {
//                 console.error(signupData);
//                 // Add error notification or visible indicator to the page
//                 // to inform the user about the signup issue.
//                 return null;
//             }

//             // Automatically log the user in after successful signup
//             return login({ username: signupData.username, password: signupData.password });
//         });
// }
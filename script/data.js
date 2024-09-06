function logout() {
    // Example: Clear user session or token
    sessionStorage.clear(); // or localStorage.clear();
    // Redirect to login page or home
    window.location.href = '/index.html';
}
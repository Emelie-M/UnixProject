async function login() {
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    const response = await fetch("../users.json"); // adjust path!
    const data = await response.json();

    const user = data.users.find(
        u => u.username === username && u.password === password
    );

    if (user) {
        alert("Login successful!");
    } else {
        alert("Invalid credentials");
    }
}
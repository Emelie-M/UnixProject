function login() {
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    // Simple validation
    if (!username || !password) {
        alert("Please fill in all fields.");
        return;
    }

    // Fake credentials (for testing only)
    const validUsername = "admin";
    const validPassword = "Passw0rd";

    if (username === validUsername && password === validPassword) {
        alert("Login successful!");

        // Redirect to dashboard/home page
        window.location.href = "../pages/page1.html";
    } else {
        alert("Invalid username or password.");
    }
}

function signUp() {
    const username = document.getElementById("signup-username").value;
    const password = document.getElementById("signup-password").value;

    // Basic validation
    if (!username || !password) {
        alert("Please fill in all fields.");
        return;
    }

    // Get existing users from localStorage
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if username already exists
    const userExists = users.find(user => user.username === username);
    if (userExists) {
        alert("Username already taken.");
        return;
    }

    // Create new user
    const newUser = {
        id: Date.now(),
        username: username,
        password: password
    };

    // Save user
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Account created successfully!");

    // Redirect to login page
    window.location.href = "../pages/login.html";
}
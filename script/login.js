async function login() {

    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    if (!username || !password) {
        alert("Please fill in all fields.");
        return;
    }

    const res = await fetch("../PHP/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    alert(data.message);

    if (data.success) {
        alert("Login successful!");
        window.location.href = "../pages/page1.html";
    }
}


async function signup() {

    const username = document.getElementById("signup-username").value;
    const password = document.getElementById("signup-password").value;

    if (!username || !password) {
        alert("Please fill in all fields.");
        return;
    }

    const res = await fetch("../PHP/signup.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    alert(data.message);

    if (data.success) {
        window.location.href = "../pages/login.html";
    }
}
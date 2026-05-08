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

    if (data.success) {
        alert("Login successful!");

        // small delay so user sees message
        setTimeout(() => {
            window.location.href = "../pages/page1.html";
        }, 500);

    } else {
        alert(data.message || "Invalid username or password.");
    }
}
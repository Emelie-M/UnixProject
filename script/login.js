/*async function login() {

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
}*/

async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hash = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(hash))
        .map(b => b.toString(16).padStart(2, "0"))
        .join("");
}

async function login() {
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    if (!username || !password) {
        alert("Please fill in all fields.");
        return;
    }

    const hashedPassword = await hashPassword(password);

    const res = await fetch("../PHP/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password: hashedPassword })
    });

    const data = await res.json();

    if (data.success) {
        alert("Login successful!");
        setTimeout(() => {
            window.location.href = "../pages/page1.html";
        }, 500);
    } else {
        alert(data.message || "Invalid username or password.");
    }
}

async function signup() {
    const username = document.getElementById("signup-username").value;
    const password = document.getElementById("signup-password").value;

    if (!username || !password) {
        alert("Please fill in all fields.");
        return;
    }

    const hashedPassword = await hashPassword(password);

    const res = await fetch("../PHP/signup.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password: hashedPassword })
    });

    const data = await res.json();

    alert(data.message);

    if (data.success) {
        window.location.href = "../pages/login.html";
    }
}
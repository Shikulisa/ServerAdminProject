document.querySelector(".login-btn").addEventListener("click", async () => {
    const email = document.querySelector("input[type='text']").value;
    const password = document.querySelector("input[type='password']").value;

    const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.ok) {
        alert("Login successful!");
        // Store token or handle successful login
        localStorage.setItem("token", data.token);
    } else {
        alert(data.error);
    }
});

document.querySelector("#signup-link").addEventListener("click", async () => {
    const email = document.querySelector("input[type='text']").value;
    const password = document.querySelector("input[type='password']").value;

    const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.ok) {
        alert("Signup successful! Please log in.");
    } else {
        alert(data.error);
    }
});

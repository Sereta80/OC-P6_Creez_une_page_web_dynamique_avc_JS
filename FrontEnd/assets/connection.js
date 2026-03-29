// Listener added to connection submit
let form = document.querySelector("form")
form.addEventListener("submit", async(event) => {
    event.preventDefault()

    // Get forms values
    const user = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    };

    // Convert to JSON format
    const userJSON = JSON.stringify(user);

    // Get API response
    const response = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type" : "application/json" },
        body: userJSON
    });
    const loginUser = await response.json();

    // Check login user
    if (loginUser.token) { // login user correct
        window.localStorage.setItem("token", loginUser.token)
        window.location.href = "index.html"
    } else { // login user incorrect
        const errorMessage = document.createElement("h3")
        errorMessage.innerText = loginUser.message
        document.querySelector("#login h2").appendChild(errorMessage)
    }
})
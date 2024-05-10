

document.addEventListener("DOMContentLoaded", function() {
    // Get the JWT token from the HTTP-only cookie
    const jwtToken = Cookies.get("jwtToken");

    console.warn(jwtToken)

    // Display the JWT token on the HTML page
    if (jwtToken) {
        document.getElementById("jwtTokenValue").textContent = jwtToken;
    } else {
        document.getElementById("jwtTokenValue").textContent = "JWT token not found in cookie.";
        console.error("JWT token not found in cookie.");
    }
});


function getUserDetails() {
    console.log("Requesting user details...")
    fetch("http://localhost:8081/api/user/User/get-details", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            // Set your custom header for the JWT token
        },
        credentials: "include" // Include credentials in the request
    })
    .then(response => {
        if (response.ok) {
            return response.json(); // Return the Promise for JSON data
        } else {
            throw new Error("Failed to fetch user details");
        }
    })
    .then(jsonData => {
        // jsonData contains the actual JSON data
        document.getElementById("firstName").textContent = JSON.stringify(jsonData);
        document.getElementById("userDetails").textContent = JSON.stringify(jsonData);
    })
    .catch(error => {
        // Handle errors
    });
}

function changeFirstName() {
    const newFirstName = document.getElementById("newFirstName").value;
    console.log("Changing first name to", newFirstName);
    fetch("http://localhost:8081/api/user/up", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            // Set your custom header for the JWT token
        },
        credentials: "include", // Include credentials in the request
        body: JSON.stringify({ firstName: newFirstName })
    })
}
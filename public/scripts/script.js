document
  .getElementById("registrationForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      interest: document.getElementById("interest").value,
      preferences: document.getElementById("preferences").value,
      newsletter: document.getElementById("newsletter").checked,
    };

    // Send data to the server
    fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Show thank you message
          document.getElementById("registrationForm").style.display = "none";
          document.getElementById("thankYouMessage").style.display = "block";
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert(
          "There was an error submitting your registration. Please try again."
        );
      });
  });

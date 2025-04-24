document.addEventListener("DOMContentLoaded", function () {
  // Initial data load
  loadRegistrations();

  // Event listeners
  document
    .getElementById("refreshData")
    .addEventListener("click", loadRegistrations);
  document.getElementById("exportCSV").addEventListener("click", exportCSV);
});

function loadRegistrations() {
  fetch("/api/admin/registrations")
    .then((response) => response.json())
    .then((data) => {
      const tableBody = document.querySelector("#registrationsTable tbody");
      tableBody.innerHTML = "";

      data.forEach((reg) => {
        const row = document.createElement("tr");

        // Format date
        const date = new Date(reg.timestamp);
        const formattedDate = date.toLocaleString();

        row.innerHTML = `
                        <td>${reg.name}</td>
                        <td>${reg.email}</td>
                        <td>${reg.phone || "-"}</td>
                        <td>${reg.interest}</td>
                        <td>${reg.preferences || "-"}</td>
                        <td>${reg.newsletter ? "Yes" : "No"}</td>
                        <td>${formattedDate}</td>
                    `;

        tableBody.appendChild(row);
      });

      document.getElementById("registrationCount").textContent = data.length;
      showStatus("Data refreshed successfully", "success");
    })
    .catch((error) => {
      console.error("Error loading data:", error);
      showStatus("Error loading data. Please try again.", "error");
    });
}

function exportCSV() {
  window.location.href = "/api/admin/export-csv";
  showStatus("CSV export started", "success");
}

function showStatus(message, type) {
  const statusEl = document.getElementById("statusMessage");
  statusEl.textContent = message;
  statusEl.className = "status " + type;
  statusEl.style.display = "block";

  setTimeout(() => {
    statusEl.style.display = "none";
  }, 3000);
}

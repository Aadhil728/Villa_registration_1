// This is a Node.js Express server example that handles form submissions
// and provides CSV export functionality

const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// In-memory storage (replace with a database in production)
let registrations = [];

// Endpoint to receive form submissions
app.post("/api/register", (req, res) => {
  const registration = {
    id: Date.now(),
    timestamp: new Date().toISOString(),
    ...req.body,
  };

  registrations.push(registration);
  console.log("New registration:", registration);

  res.status(200).json({ success: true, message: "Registration successful" });
});

// Admin endpoint to get all registrations (should be protected in production)
app.get("/api/admin/registrations", (req, res) => {
  res.json(registrations);
});

// Endpoint to export registrations as CSV
app.get("/api/admin/export-csv", (req, res) => {
  // Create CSV header
  let csvContent =
    "ID,Timestamp,Name,Email,Phone,Interest,Preference,Newsletter\n";

  // Add data rows
  registrations.forEach((reg) => {
    csvContent += `${reg.id},${reg.timestamp},"${reg.name}","${reg.email}","${reg.phone}","${reg.interest}","${reg.preferences}",${reg.newsletter}\n`;
  });

  // Set headers for file download
  res.setHeader("Content-Type", "text/csv");
  res.setHeader(
    "Content-Disposition",
    "attachment; filename=villa_exhibition_registrations.csv"
  );

  // Send the CSV data
  res.send(csvContent);
});

// Simple admin page (in production, add authentication)
app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "admin.html"));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

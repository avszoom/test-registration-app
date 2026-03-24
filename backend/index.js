const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

app.post("/api/register", (req, res) => {
  const { name, email, password } = req.body;
  const errors = [];

  if (!name || name.trim().length < 2) errors.push("Name must be at least 2 characters.");
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push("Valid email is required.");
  if (!password || password.length < 6) errors.push("Password must be at least 6 characters.");

  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  res.json({
    success: true,
    message: `User ${name} registered successfully.`,
    user: { name, email }
  });
});

app.get("/api/users", (req, res) => {
  res.json([
    { id: 1, name: "Alice", email: "alice@example.com" },
    { id: 2, name: "Bob", email: "bob@example.com" }
  ]);
});

app.listen(PORT, () => {
  console.log(`Registration API listening on port ${PORT}`);
});

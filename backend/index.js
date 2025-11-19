// index.js – Backend Server (Local + Docker Execution Support)
// -------------------------------------------------------------
// NOTE FOR FUTURE:
// To enable Docker execution:
//   1. Install Docker Desktop
//   2. Build all images listed in runDocker.js header comments
//   3. Then from frontend, switch executionMode = "docker"
//   4. Everything will work out-of-the-box.

const express = require("express");
const cors = require("cors");

const runLocal = require("./src/runLocal");
const runDocker = require("./src/runDocker"); // <— Docker runner (works, but returns friendly error if docker off)

const app = express();
app.use(cors());
app.use(express.json({ limit: "5mb" }));

// SIMPLE TEST
app.get("/", (req, res) => {
    res.send("Backend is running...");
});

// ----------------------
// LOCAL EXECUTION
// ----------------------
app.post("/run/local", async (req, res) => {
    const { language, code, stdin } = req.body;

    try {
        const result = await runLocal(language, code, stdin || "");
        res.json(result);
    } catch (err) {
        res.status(500).json({ success: false, error: String(err) });
    }
});

// ----------------------
// DOCKER EXECUTION
// ----------------------
app.post("/run/docker", async (req, res) => {
    const { language, code, stdin } = req.body;

    try {
        const result = await runDocker(language, code, stdin || "");
        res.json(result);
    } catch (err) {
        res.status(500).json({ success: false, error: String(err) });
    }
});

// Start server
app.listen(5000, () => {
    console.log("Backend running on port 5000");
});

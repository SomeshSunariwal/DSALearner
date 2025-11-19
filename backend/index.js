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
const fs = require("fs");
const path = require("path");


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

app.get("/problems-meta", (req, res) => {
    const basePath = path.join(__dirname, "data");

    const difficulties = fs.readdirSync(basePath)
        .filter((d) => fs.statSync(path.join(basePath, d)).isDirectory());

    const output = [];

    for (const diff of difficulties) {
        const diffPath = path.join(basePath, diff);
        const categories = fs.readdirSync(diffPath)
            .filter((c) => fs.statSync(path.join(diffPath, c)).isDirectory());

        const categoryList = [];

        for (const cat of categories) {
            const categoryPath = path.join(diffPath, cat);

            // All JSON files inside category
            const problems = fs.readdirSync(categoryPath)
                .filter((file) => file.endsWith(".json"))
                .map((file, index) => ({
                    id: index + 1,
                    name: file.replace(".json", "").trim(),
                    file: file
                }));

            categoryList.push({
                category: cat,
                problems
            });
        }

        output.push({
            difficulty: diff,
            categories: categoryList
        });
    }

    res.json(output);
});

// ------------------------------------------------------------------
// API 2: RETURN ACTUAL FULL PROBLEM JSON
// ------------------------------------------------------------------
app.get("/problem", (req, res) => {
    const { difficulty, category, file } = req.query;

    if (!difficulty || !category || !file) {
        return res.status(400).json({
            error: "Missing query params: difficulty, category, file"
        });
    }

    const filePath = path.join(__dirname, "data", difficulty, category, file);

    console.log("File Path" + filePath);


    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: "Problem file not found." });
    }

    try {
        const json = JSON.parse(fs.readFileSync(filePath, "utf8"));
        res.json(json);
    } catch (err) {
        res.status(500).json({ error: "Failed to parse JSON file." });
    }
});


// Start server
app.listen(5000, () => {
    console.log("Backend running on port 5000");
});

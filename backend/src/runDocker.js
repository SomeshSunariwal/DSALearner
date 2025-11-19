// runDocker.js – Executes code inside ONE universal docker container
// ---------------------------------------------------------------
// FUTURE SETUP:
// 1. Install Docker Desktop
// 2. Build image using:
//      docker build -t universal-runner -f Dockerfile .
// 3. Then frontend Docker-mode will work automatically.
// ---------------------------------------------------------------

const fs = require("fs");
const os = require("os");
const path = require("path");
const { exec } = require("child_process");

function execCmd(cmd) {
    return new Promise((resolve) => {
        exec(cmd, { timeout: 10000 }, (error, stdout, stderr) => {
            resolve({ error, stdout, stderr });
        });
    });
}

async function runDocker(language, code, stdin = "") {
    // Check docker daemon
    const check = await execCmd("docker info");
    if (check.error) {
        return {
            success: false,
            error: "Docker engine is not running. Please start Docker Desktop."
        };
    }

    // Prepare temp folder
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "docker-run-"));
    let srcFile = "";

    switch (language) {
        case "c":
            srcFile = path.join(tempDir, "main.c");
            break;
        case "cpp":
            srcFile = path.join(tempDir, "main.cpp");
            break;
        case "python":
            srcFile = path.join(tempDir, "script.py");
            break;
        case "java":
            srcFile = path.join(tempDir, "Main.java");
            break;
        default:
            return { success: false, error: "Unsupported language" };
    }

    fs.writeFileSync(srcFile, code);

    // Docker command
    const cmd =
        `docker run --rm -v "${tempDir}:/app" universal-runner ` +
        `${language} "${stdin.replace(/"/g, '\\"')}"`;

    const result = await execCmd(cmd);

    // Cleanup
    fs.rmSync(tempDir, { recursive: true, force: true });

    return {
        success: !result.error,
        stdout: result.stdout || "",
        stderr: result.stderr || "",
        dockerCmd: cmd
    };
}

module.exports = runDocker;

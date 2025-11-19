import React, { useState } from "react";
import { runCode } from "../api/runCode";

export default function CodeRunner() {
    const [language, setLanguage] = useState("cpp");
    const [stdin, setStdin] = useState("");
    const [code, setCode] = useState(`#include <iostream>
using namespace std;

int main() {
    int a;
    cin >> a;
    cout << a * 2;
}`);
    const [output, setOutput] = useState("");
    const [mode, setMode] = useState("local"); // local | docker
    const [loading, setLoading] = useState(false);

    const handleRun = async () => {
        setLoading(true);
        setOutput("Running...");

        const result = await runCode({
            language,
            code,
            stdin,
            mode,
        });

        if (result.success) {
            setOutput(result.run?.stdout || result.stdout || "");
        } else {
            setOutput(result.error || "Unknown error.");
        }

        setLoading(false);
    };

    return (
        <div style={{ padding: 20, maxWidth: 800 }}>
            <h2>Code Runner</h2>

            {/* Language dropdown */}
            <div>
                <label>Language: </label>
                <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                >
                    <option value="cpp">C++</option>
                    <option value="c">C</option>
                    <option value="python">Python</option>
                    <option value="java">Java</option>
                </select>
            </div>

            {/* Execution mode */}
            <div style={{ marginTop: 10 }}>
                <label>Execution Mode: </label>
                <select
                    value={mode}
                    onChange={(e) => setMode(e.target.value)}
                >
                    <option value="local">Local Compiler</option>
                    <option value="docker">Docker (Sandbox)</option>
                </select>
            </div>

            {/* Code textarea — later we replace with Monaco */}
            <div style={{ marginTop: 20 }}>
                <textarea
                    style={{ width: "100%", height: 200 }}
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                ></textarea>
            </div>

            {/* stdin */}
            <div style={{ marginTop: 10 }}>
                <label>Input:</label>
                <textarea
                    style={{
                        width: "100%",
                        height: 50,
                        color: "#ffffffff",        // <── ADD THIS
                    }}
                    value={stdin}
                    onChange={(e) => setStdin(e.target.value)}
                ></textarea>

            </div>

            {/* Run Button */}
            <button
                onClick={handleRun}
                disabled={loading}
                style={{
                    marginTop: 20,
                    padding: "10px 20px",
                    background: "#007bff",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                }}
            >
                {loading ? "Running..." : "Run Code"}
            </button>

            {/* Output */}
            <div style={{ marginTop: 20 }}>
                <h3>Output:</h3>
                <pre
                    style={{
                        background: "#eee",
                        padding: 10,
                        minHeight: 50,
                        whiteSpace: "pre-wrap",
                        color: "#000",        // <── ADD THIS
                    }}
                >
                    {output}
                </pre>
            </div>
        </div>
    );
}

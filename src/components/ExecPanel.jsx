import React, { useState, useEffect } from "react";
import "./execpanel.css";
import ElectricBorder from "../UIComp/ElectricBorder";
import GlareHover from "../UIComp/GlareHover";
import { runCode } from "../api/runCode";

export default function ExecPanel() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("Output will appear here...");
    const [loading, setLoading] = useState(false);

    // Ensure global values exist
    useEffect(() => {
        if (!window.currentCode) window.currentCode = "";
        if (!window.currentLanguage) window.currentLanguage = "cpp";
        if (!window.currentMode) window.currentMode = "local";
    }, []);

    const handleRun = async () => {
        if (!window.currentCode.trim()) {
            setOutput("❌ No code found in editor");
            return;
        }

        setLoading(true);
        setOutput("Running...");

        const result = await runCode({
            language: window.currentLanguage,
            code: window.currentCode,
            stdin: input,
            mode: window.currentMode
        });

        if (result.success) {
            const out =
                (result.run && result.run.stdout) ||
                result.stdout ||
                "";
            setOutput(out || "");
        } else {
            const error =
                result.compile?.stderr ||
                result.run?.stderr ||
                result.error ||
                "Unknown error";
            setOutput(error);
        }

        setLoading(false);
    };

    return (
        <div className="exec-container">

            {/* INPUT AREA */}
            <div className="exec-input-wrapper">
                <strong className="exec-input-label">Input</strong>

                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter input here..."
                    className="exec-input-area"
                ></textarea>
            </div>

            {/* BUTTONS */}
            <div className="exec-buttons">

                {/* Run button (GlareHover) */}
                <GlareHover
                    glareColor="#ffffff"
                    glareOpacity={0.3}
                    glareAngle={-30}
                    glareSize={300}
                    transitionDuration={800}
                    playOnce={false}
                >
                    <button
                        type="button"
                        className="exec-btn exec-btn-run"
                        onClick={handleRun}
                        disabled={loading}
                    >
                        {loading ? "Running..." : "Run"}
                    </button>
                </GlareHover>

                {/* Submit (future feature) */}
                <ElectricBorder color="#00eaff" speed={1.5} chaos={1.2} thickness={2}>
                    <button
                        type="button"
                        className="exec-btn exec-btn-submit"
                        disabled
                    >
                        Submit
                    </button>
                </ElectricBorder>
            </div>

            {/* OUTPUT BOX */}
            <div className="exec-output">
                <pre style={{ whiteSpace: "pre-wrap", margin: 0 }}>
                    {output}
                </pre>
            </div>
        </div>
    );
}

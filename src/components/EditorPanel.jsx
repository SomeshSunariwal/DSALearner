import React, { useState } from "react";
import Editor from "@monaco-editor/react";

export default function EditorPanel() {
    const [code, setCode] = useState("// Start typing...");
    const [language, setLanguage] = useState("cpp");
    const [intellisense, setIntellisense] = useState(true);

    return (
        <div
            style={{
                height: "100%",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
            }}
        >
            {/* Toolbar */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    background: "#fff",
                    padding: "12px",
                    borderRadius: "10px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                }}
            >
                {/* Language Select */}
                <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    style={{
                        padding: "8px 14px",
                        borderRadius: "8px",
                        border: "1px solid #d1d5db",
                        fontSize: "14px",
                        cursor: "pointer"
                    }}
                >
                    <option value="cpp">C++</option>
                    <option value="c">C</option>
                    <option value="python">Python</option>
                    <option value="java">Java</option>
                </select>

                {/* IntelliSense Toggle */}
                <button
                    onClick={() => setIntellisense(!intellisense)}
                    style={{
                        padding: "8px 14px",
                        borderRadius: "8px",
                        background: intellisense ? "#6366f1" : "#9ca3af",
                        color: "white",
                        border: "none",
                        cursor: "pointer",
                        fontSize: "14px",
                    }}
                >
                    IntelliSense: {intellisense ? "ON" : "OFF"}
                </button>
            </div>

            {/* Monaco Editor */}
            <div style={{ flexGrow: 1, minHeight: 0 }}>
                <Editor
                    height="100%"
                    language={language}
                    value={code}
                    onChange={setCode}
                    theme="vs-dark"
                    options={{
                        fontSize: 14,
                        minimap: { enabled: false },
                        smoothScrolling: true,
                        scrollBeyondLastLine: false,
                        automaticLayout: true,            // <---- Important
                        suggestOnTriggerCharacters: intellisense,
                        quickSuggestions: intellisense,
                        wordBasedSuggestions: intellisense,
                        tabSize: 2,
                    }}
                />
            </div>
        </div>
    );
}

import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import "./editorpanel.css";

export default function EditorPanel() {
    const [code, setCode] = useState(`// Start typing C++ code here...
#include <iostream>
using namespace std;

int main() {
    int a;
    cin >> a;
    cout << a * 2;
    return 0;
}`);

    const [language, setLanguage] = useState("cpp");
    const [intellisense, setIntellisense] = useState(true);

    // Expose initial values for ExecPanel
    useEffect(() => {
        window.currentCode = code;
        window.currentLanguage = language;
    }, []); // run once on mount

    // update global language whenever it changes
    useEffect(() => {
        window.currentLanguage = language;
    }, [language]);

    // ---------------------------
    // Handle editor changes
    // ---------------------------
    const handleEditorChange = (value) => {
        // Monaco sometimes passes undefined — guard it
        const next = typeof value === "string" ? value : "";
        setCode(next);
        // expose globally so ExecPanel/run button can read it
        window.currentCode = next;
    };

    return (
        <div className="editor-container">
            {/* Toolbar */}
            <div className="editor-toolbar">
                {/* Language Dropdown */}
                <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="editor-lang-select"
                >
                    <option value="cpp">C++</option>
                    <option value="c">C</option>
                    <option value="python">Python</option>
                    <option value="java">Java</option>
                </select>

                {/* IntelliSense Toggle */}
                <button
                    onClick={() => setIntellisense((v) => !v)}
                    className={`editor-intellisense-btn ${intellisense ? "editor-intellisense-on" : "editor-intellisense-off"
                        }`}
                >
                    IntelliSense: {intellisense ? "ON" : "OFF"}
                </button>

                {/* Execution Mode (kept here for convenience, ExecPanel reads window.currentMode if needed) */}
                <select
                    value={window.currentMode || "local"}
                    onChange={(e) => (window.currentMode = e.target.value)}
                    className="editor-lang-select"
                    style={{ marginLeft: "10px" }}
                >
                    <option value="local">Local Compiler</option>
                    <option value="docker">Docker</option>
                </select>
            </div>

            {/* Monaco Editor */}
            <div className="editor-wrapper">
                <Editor
                    height="100%"
                    language={language}
                    value={code}
                    onChange={handleEditorChange}
                    theme="vs-dark"
                    options={{
                        fontSize: 14,
                        minimap: { enabled: false },
                        scrollBeyondLastLine: false,
                        automaticLayout: true,

                        // INTELLISENSE OPTIONS
                        suggestOnTriggerCharacters: intellisense,
                        quickSuggestions: intellisense ? "on" : false,
                        wordBasedSuggestions: intellisense,
                        parameterHints: { enabled: intellisense },
                        autoClosingBrackets: "always",
                        autoIndent: "full",
                        tabSize: 2,
                    }}
                />
            </div>
        </div>
    );
}

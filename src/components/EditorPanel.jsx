import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Editor from "@monaco-editor/react";
import Constant from "../constants/constants"
import "./editorpanel.css";

export default function EditorPanel() {
    const DefaultCode = `// Start typing C++ code here...
#include <iostream>
#include <bits.stdc++.h>

using namespace std;

int main() {
    cout << "Hello World!" << endl;
    return 0;
}`
    const [code, setCode] = useState(DefaultCode);
    const [language, setLanguage] = useState("cpp");
    const [intellisense, setIntellisense] = useState(true);

    // keep refs to editor + monaco
    const editorRef = useRef(null);
    const monacoRef = useRef(null);
    const [fontSize, setFontSize] = useState(14);
    const [wordWrap, setWordWrap] = useState(false);

    const { data, loading, error } = useSelector((state) => state.problem);

    // ================================
    //      Set Sample Code as per the language
    // ==============
    // ==================

    useEffect(() => {
        if (!loading && error == null) {
            setCode(data[Constant.SAMPLE_CODE][language])
        } else {
            setCode(DefaultCode)
        }
        // Set Initial Code
    }, [loading, language])


    useEffect(() => {
        setCode(DefaultCode)
    }, [])

    // ================================
    //      INITIAL GLOBAL SETUP
    // ================================
    useEffect(() => {
        window.currentCode = code;
        window.currentLanguage = language;
        window.currentMode = "local";
    }, [language]); // run once on mount


    // ================================
    //      HANDLE EDITOR CHANGE
    // ================================
    const handleEditorChange = (value) => {
        const next = typeof value === "string" ? value : "";
        setCode(next);
        window.currentCode = next;
    };

    // ------------------------------
    // Simple brace-based fallback formatter
    // (used only if Monaco doesn't provide a formatter)
    // ------------------------------
    const simpleIndentFormatter = (raw) => {
        const lines = raw.split("\n");
        let indentLevel = 0;
        const indentSize = 4;
        const out = [];

        // helper: count net braces on a line ignoring strings (simple heuristic)
        const countBraces = (s) => {
            // remove string literals (simplistic)
            let withoutStr = s.replace(/"(?:\\.|[^"\\])*"/g, '""').replace(/'(?:\\.|[^'\\])*'/g, "''");
            // remove single-line comments
            withoutStr = withoutStr.replace(/\/\/.*$/g, "");
            // remove block comments quickly (doesn't handle multi-line fully, but ok)
            withoutStr = withoutStr.replace(/\/\*[\s\S]*?\*\//g, "");
            let open = 0;
            let close = 0;
            for (let ch of withoutStr) {
                if (ch === "{") open++;
                if (ch === "}") close++;
            }
            return { open, close };
        };

        for (let rawLine of lines) {
            let line = rawLine.trim();

            // skip empty lines but preserve a single blank line
            if (line === "") {
                out.push("");
                continue;
            }

            // if line begins with a closing brace, dedent first
            if (line.startsWith("}")) {
                indentLevel = Math.max(0, indentLevel - 1);
            }

            const indent = " ".repeat(indentLevel * indentSize);
            out.push(indent + line);

            // update indent level for next line
            const { open, close } = countBraces(line);

            // net change: open - close (but if a line had close more than open,
            // we already accounted when it starts with a close)
            indentLevel += open - close;
            if (indentLevel < 0) indentLevel = 0;
        }

        return out.join("\n");
    };

    const prettifyCode = () => {
        if (["cpp", "c", "java"].includes(language)) {
            // USE YOUR OWN SIMPLE FORMATTER
            const formatted = simpleIndentFormatter(code);

            setCode(formatted);
            window.currentCode = formatted;

            if (editorRef.current) {
                editorRef.current.setValue(formatted);
            }
            return;
        }

        // DEFAULT: try Monaco formatter
        try {
            editorRef.current?.getAction("editor.action.formatDocument").run();
            const formatted = editorRef.current.getValue();
            setCode(formatted);
            window.currentCode = formatted;
        } catch (err) {
            console.error("Format failed:", err);
        }
    };

    // Called when editor mounts — store references
    const handleEditorMount = (editorInstance, monacoInstance) => {
        editorRef.current = editorInstance;
        monacoRef.current = monacoInstance;
        // also expose globally for ExecPanel or debug if you rely on window.monacoEditor
        window.monacoEditor = editorInstance;
        window.monaco = monacoInstance;
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
                    type="button"
                    onClick={() => setIntellisense((v) => !v)}
                    className={`editor-intellisense-btn ${intellisense ? "editor-intellisense-on" : "editor-intellisense-off"
                        }`}
                >
                    IntelliSense: {intellisense ? "ON" : "OFF"}
                </button>

                {/* Execution Mode */}
                <select
                    value={window.currentMode}
                    onChange={(e) => (window.currentMode = e.target.value)}
                    className="editor-lang-select"
                    style={{ marginLeft: "10px" }}
                >
                    <option value="local">Local Compiler</option>
                    <option value="docker">Docker</option>
                </select>

                {/* FONT SIZE SLIDER */}
                {/* MACOS STYLE FONT SIZE SLIDER */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        marginLeft: "20px",
                        padding: "6px 12px",
                    }}
                >
                    <label
                        style={{
                            color: "#000000ff",
                            fontSize: "14px",
                            fontWeight: 500,
                            fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
                        }}
                    >
                        {fontSize}px
                    </label>

                    <input
                        type="range"
                        min="10"
                        max="40"
                        value={fontSize}
                        onChange={(e) => setFontSize(Number(e.target.value))}
                        className="mac-slider"
                        style={{ width: "150px" }}
                    />

                    <style>{`
        /* Track */
        .mac - slider {
                            - webkit - appearance: none;
    appearance: none;
    height: 4px;
    border - radius: 2px;
    background: linear - gradient(to right, #d3d3d3, #aaa);
    outline: none;
    cursor: pointer;
    transition: background 0.2s ease;
}

                        /* Track (hover) */
                        .mac - slider:hover {
    background: linear - gradient(to right, #e0e0e0, #b8b8b8);
}

                        /* Thumb */
                        .mac - slider:: -webkit - slider - thumb {
    -webkit - appearance: none;
    height: 16px;
    width: 16px;
    border - radius: 50 %;
    background: #ffffff;
    border: 1px solid rgba(0, 0, 0, 0.15);
    box - shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
    cursor: pointer;
    transition: all 0.15s ease;
}

                        /* Thumb hover */
                        .mac - slider:: -webkit - slider - thumb:hover {
    background: #fafafa;
    box - shadow: 0 3px 6px rgba(0, 0, 0, 0.35);
    transform: scale(1.08);
}

                        /* Firefox */
                        .mac - slider:: -moz - range - thumb {
    height: 16px;
    width: 16px;
    border - radius: 50 %;
    background: #ffffff;
    border: 1px solid rgba(0, 0, 0, 0.15);
    box - shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
    cursor: pointer;
    transition: all 0.15s;
}
`}</style>
                </div>



                {/* PUSH NEXT BUTTONS TO RIGHT */}
                <div style={{ marginLeft: "auto", display: "flex", gap: "14px" }}>

                    {/* WORD WRAP */}
                    <button
                        type="button"
                        onClick={() => setWordWrap((v) => !v)}
                        style={{
                            padding: "6px 12px",
                            background: wordWrap ? "#2563eb" : "#374151",
                            borderRadius: "6px",
                            border: "none",
                            color: "white",
                            cursor: "pointer",
                            fontSize: "14px",
                        }}
                    >
                        {wordWrap ? "Wrap: ON" : "Wrap: OFF"}
                    </button>

                    {/* PRETTIFY */}
                    <button
                        type="button"
                        onClick={prettifyCode}
                        style={{
                            padding: "6px 14px",
                            background: "#4b5563",
                            borderRadius: "8px",
                            border: "none",
                            color: "white",
                            cursor: "pointer",
                            fontSize: "14px",
                        }}
                    >
                        ✨ Prettify
                    </button>

                </div>
            </div>


            {/* Monaco Editor */}
            <div className="editor-wrapper">
                <Editor
                    height="100%"
                    language={language}
                    value={code}
                    onChange={handleEditorChange}
                    theme="vs-dark"
                    onMount={handleEditorMount}
                    options={{
                        fontSize: fontSize,
                        wordWrap: wordWrap ? "on" : "off",
                        minimap: { enabled: false },
                        scrollBeyondLastLine: false,
                        automaticLayout: true,

                        // INTELLISENSE
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

import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Editor from "@monaco-editor/react";
import Constant from "../constants/constants";
import "./editorpanel.css";

export default function EditorPanel() {
    const DefaultCode = `// Start typing C++ code here...
#include <iostream>
#include <bits/stdc++.h>

using namespace std;

int main() {
    cout << "Hello World!" << endl;
    return 0;
}`;

    const [code, setCode] = useState(DefaultCode);
    const [language, setLanguage] = useState("cpp");
    const [intellisense, setIntellisense] = useState(true);
    const [fontSize, setFontSize] = useState(14);
    const [wordWrap, setWordWrap] = useState(false);

    const editorRef = useRef(null);
    const monacoRef = useRef(null);
    const lastProblemRef = useRef(null);
    const lastLanguageRef = useRef(language);

    const { data, loading, error } = useSelector((state) => state.problem);

    useEffect(() => {
        if (loading || error || !data) return;

        const problemChanged = data.ProblemName !== lastProblemRef.current;
        const languageChanged = language !== lastLanguageRef.current;

        if (problemChanged || languageChanged) {
            const sample =
                data?.[Constant.SAMPLE_CODE]?.[language] || DefaultCode;

            setCode(sample);
            editorRef.current?.setValue(sample);

            lastProblemRef.current = data.ProblemName;
            lastLanguageRef.current = language;
        }
    }, [data, language, loading, error]);

    useEffect(() => {
        window.currentCode = code;
        window.currentLanguage = language;
        window.currentMode = "local";
    }, [language]);

    const handleEditorChange = (value) => {
        if (typeof value !== "string") return;
        setCode(value);
        window.currentCode = value;
    };

    const handleEditorMount = (editorInstance, monacoInstance) => {
        editorRef.current = editorInstance;
        monacoRef.current = monacoInstance;
        window.monacoEditor = editorInstance;
        window.monaco = monacoInstance;
    };

    const prettifyCode = () => {
        ////////////////////////////////////////////
        ////////////////////////////////////////////
        /////  Code to Prettify Code/////
        console.log("Call to Prettify Code")
        ////////////////////////////////////////////
        ////////////////////////////////////////////
        ////////////////////////////////////////////
    };

    return (
        <div className="editor-container">
            {/* Toolbar */}
            <div className="editor-toolbar">

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

                <button
                    type="button"
                    onClick={() => setIntellisense(v => !v)}
                    className={`editor-intellisense-btn ${intellisense ? "editor-intellisense-on" : "editor-intellisense-off"}`}
                >
                    IntelliSense: {intellisense ? "ON" : "OFF"}
                </button>

                <select
                    value={window.currentMode}
                    onChange={(e) => (window.currentMode = e.target.value)}
                    className="editor-lang-select"
                >
                    <option value="local">Local Compiler</option>
                    <option value="docker">Docker</option>
                </select>

                <div className="font-slider">
                    <label>{fontSize}px</label>
                    <input
                        type="range"
                        min="10"
                        max="40"
                        value={fontSize}
                        onChange={(e) => setFontSize(Number(e.target.value))}
                        className="mac-slider"
                    />
                </div>

                <div className="toolbar-right">
                    <button
                        type="button"
                        className={`wrap-btn ${wordWrap ? "on" : "off"}`}
                        onClick={() => setWordWrap(v => !v)}
                    >
                        Wrap: {wordWrap ? "ON" : "OFF"}
                    </button>

                    <button type="button" className="prettify-btn" onClick={prettifyCode}>
                        ✨ Prettify
                    </button>
                </div>
            </div>

            {/* Monaco Editor */}
            <div
                className="editor-wrapper"
                onKeyDownCapture={(e) => {
                    if (e.target.closest(".monaco-editor") && e.key === "Enter") {
                        e.stopPropagation();
                    }
                }}
            >
                <Editor
                    height="100%"
                    language={language}
                    defaultValue={DefaultCode}
                    onChange={handleEditorChange}
                    theme="vs-dark"
                    onMount={handleEditorMount}
                    options={{
                        fontSize,
                        wordWrap: wordWrap ? "on" : "off",
                        minimap: { enabled: false },
                        scrollBeyondLastLine: false,
                        automaticLayout: true,
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

import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import "./editorpanel.css";

export default function EditorPanel() {
    const [code, setCode] = useState("// Start typing...");
    const [language, setLanguage] = useState("cpp");
    const [intellisense, setIntellisense] = useState(true);

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
                    onClick={() => setIntellisense(!intellisense)}
                    className={`editor-intellisense-btn ${intellisense ? "editor-intellisense-on" : "editor-intellisense-off"
                        }`}
                >
                    IntelliSense: {intellisense ? "ON" : "OFF"}
                </button>

            </div>

            {/* Monaco Editor */}
            <div className="editor-wrapper">
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
                        automaticLayout: true,
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

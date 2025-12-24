import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import Editor from "@monaco-editor/react";

export default function AddProblemModal({
    isOpen,
    onClose,
    levels,
    categories
}) {
    if (!isOpen) return null;

    const [previewMode, setPreviewMode] = useState(false);

    const languageMap = {
        c: "c",
        cpp: "cpp",
        python: "python",
        java: "java"
    };

    const [form, setForm] = useState({
        level: "",
        topic: "",
        name: "",
        description: "",
        language: "",
        starterCode: ""
    });

    const update = (key, value) => {
        setForm(prev => ({ ...prev, [key]: value }));
    };

    /* ================= DEFAULT DROPDOWN VALUES ================= */

    useEffect(() => {
        if (!isOpen) return;

        setForm(prev => ({
            ...prev,
            level: prev.level || levels?.[0] || "Easy",
            topic: prev.topic || categories?.[0] || "1. Array",
            language: prev.language || "c"
        }));
    }, [isOpen, levels, categories]);

    /* ================= AUTO STARTER CODE ================= */

    useEffect(() => {
        if (!form.language) return;

        const templates = {
            c: `#include <stdio.h>

int main() {
    
    return 0;
}`,
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    
    return 0;
}`,
            python: `def main():
    pass

if __name__ == "__main__":
    main()`,
            java: `class Main {
    public static void main(String[] args) {
        
    }
}`
        };

        update("starterCode", templates[form.language]);
    }, [form.language]);

    return (
        <div style={overlay}>
            <div style={modal}>
                <div style={content}>

                    {/* Header */}
                    <div style={header}>
                        <h2 style={{ margin: 0 }}>Add New Problem</h2>
                        <span onClick={onClose} style={closeBtn}>✕</span>
                    </div>

                    {/* Level & Topic */}
                    <div style={row}>
                        <select
                            style={select}
                            value={form.level}
                            onChange={e => update("level", e.target.value)}
                        >
                            {levels.map((l, i) => (
                                <option key={i} value={l}>{l}</option>
                            ))}
                        </select>

                        <select
                            style={select}
                            value={form.topic}
                            onChange={e => update("topic", e.target.value)}
                        >
                            {categories.map((c, i) => (
                                <option key={i} value={c}>{c}</option>
                            ))}
                        </select>
                    </div>

                    {/* Problem Name */}
                    <input
                        style={input}
                        placeholder="Problem Name"
                        value={form.name}
                        onChange={e => update("name", e.target.value)}
                    />

                    {/* Markdown Description */}
                    <div>
                        <div style={tabRow}>
                            <button
                                style={!previewMode ? activeTab : tab}
                                onClick={() => setPreviewMode(false)}
                            >
                                Text
                            </button>
                            <button
                                style={previewMode ? activeTab : tab}
                                onClick={() => setPreviewMode(true)}
                            >
                                Preview
                            </button>
                        </div>

                        {!previewMode ? (
                            <textarea
                                style={markdownTextarea}
                                placeholder="Write problem description in Markdown..."
                                value={form.description}
                                onChange={e => update("description", e.target.value)}
                            />
                        ) : (
                            <div style={markdownPreview}>
                                <ReactMarkdown
                                    components={{
                                        h1: ({ children }) => <h1 style={mdH1}>{children}</h1>,
                                        h2: ({ children }) => <h2 style={mdH2}>{children}</h2>,
                                        p: ({ children }) => <p style={mdP}>{children}</p>,
                                        code: ({ inline, children }) =>
                                            inline ? (
                                                <code style={mdInlineCode}>{children}</code>
                                            ) : (
                                                <pre style={mdCodeBlock}>
                                                    <code>{children}</code>
                                                </pre>
                                            ),
                                        ul: ({ children }) => <ul style={mdUl}>{children}</ul>,
                                        li: ({ children }) => <li style={mdLi}>{children}</li>
                                    }}
                                >
                                    {form.description || "Nothing to preview..."}
                                </ReactMarkdown>
                            </div>
                        )}
                    </div>

                    {/* Language */}
                    <select
                        style={select}
                        value={form.language}
                        onChange={e => update("language", e.target.value)}
                    >
                        <option value="c">C</option>
                        <option value="cpp">C++</option>
                        <option value="python">Python</option>
                        <option value="java">Java</option>
                    </select>

                    {/* Starter Code */}
                    <div style={codeEditorWrapper}>
                        <Editor
                            height="200px"
                            theme="vs-dark"
                            language={languageMap[form.language]}
                            value={form.starterCode}
                            onChange={(value) => update("starterCode", value || "")}
                            options={{
                                minimap: { enabled: false },
                                fontSize: 13,
                                fontFamily: "JetBrains Mono, Fira Code, monospace",
                                lineNumbers: "on",
                                scrollBeyondLastLine: false,
                                automaticLayout: true,
                                padding: { top: 12, bottom: 8 }
                            }}
                        />
                    </div>

                    {/* Footer */}
                    <div style={footer}>
                        <button style={cancelBtn} onClick={onClose}>
                            Cancel
                        </button>
                        <button style={addBtn}>
                            Add Problem
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}

/* ================= STYLES ================= */

const overlay = {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.6)",
    backdropFilter: "blur(6px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000
};

const modal = {
    width: "680px",
    maxHeight: "90vh",
    background: "linear-gradient(180deg, #ffffff, #f9fafb)",
    borderRadius: "18px",
    boxShadow: "0 25px 50px rgba(0,0,0,0.25)",
    overflowY: "auto"
};

const content = {
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    gap: "16px"
};

const header = { display: "flex", justifyContent: "space-between", alignItems: "center" };
const closeBtn = { cursor: "pointer", fontSize: "18px", opacity: 0.6 };
const row = { display: "flex", gap: "12px" };

const input = {
    width: "100%",
    padding: "10px 14px",
    borderRadius: "10px",
    border: "1px solid #d1d5db",
    fontSize: "14px",
    boxSizing: "border-box"
};

const select = {
    flex: 1,
    padding: "10px 14px",
    borderRadius: "10px",
    border: "1px solid #d1d5db",
    fontSize: "14px",
    background: "#fff",
    boxSizing: "border-box"
};

const tabRow = { display: "flex", gap: "8px", marginBottom: "6px" };

const tab = {
    padding: "6px 16px",
    borderRadius: "999px",
    border: "1px solid #d1d5db",
    background: "#fff",
    cursor: "pointer",
    fontSize: "13px"
};

const activeTab = { ...tab, background: "#4f46e5", color: "#fff", borderColor: "#4f46e5" };

const markdownTextarea = {
    width: "100%",
    minHeight: "200px",
    padding: "14px 16px",
    borderRadius: "12px",
    border: "1px solid #d1d5db",
    fontSize: "14px",
    resize: "vertical",
    boxSizing: "border-box"
};

const markdownPreview = {
    width: "100%",
    minHeight: "200px",
    padding: "16px",
    borderRadius: "12px",
    background: "#f8fafc",
    border: "1px solid #e5e7eb",
    overflowY: "auto",
    boxSizing: "border-box"
};

const codeEditorWrapper = {
    marginTop: "6px",
    borderRadius: "12px",
    overflow: "hidden",
    border: "1px solid #1e293b"
};

const footer = { display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "6px" };

const cancelBtn = {
    padding: "8px 16px",
    borderRadius: "10px",
    border: "1px solid #d1d5db",
    background: "#fff",
    cursor: "pointer"
};

const addBtn = {
    padding: "8px 20px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(135deg, #4f46e5, #6366f1)",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer"
};

/* ===== MARKDOWN STYLES ===== */

const mdH1 = { fontSize: "22px", fontWeight: "bold", marginBottom: "10px" };
const mdH2 = { fontSize: "18px", fontWeight: "600", marginBottom: "8px" };
const mdP = { fontSize: "14px", lineHeight: "1.6", marginBottom: "8px" };
const mdInlineCode = {
    background: "#eef2ff",
    padding: "2px 6px",
    borderRadius: "6px",
    fontSize: "13px",
    fontFamily: "monospace"
};
const mdCodeBlock = {
    background: "#0f172a",
    color: "#e5e7eb",
    padding: "12px",
    borderRadius: "10px",
    overflowX: "auto",
    fontSize: "13px",
    marginBottom: "10px"
};
const mdUl = { paddingLeft: "18px", marginBottom: "8px" };
const mdLi = { marginBottom: "4px" };

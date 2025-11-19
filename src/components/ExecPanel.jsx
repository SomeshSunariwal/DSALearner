import React, { useState } from "react";
import "./execpanel.css";

export default function ExecPanel() {
    const [input, setInput] = useState("");

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

            {/* BUTTON ROW */}
            <div className="exec-buttons">
                <button className="exec-btn exec-btn-run">Run</button>
                <button className="exec-btn exec-btn-submit">Submit</button>
            </div>

            {/* OUTPUT BOX */}
            <div className="exec-output">
                Output will appear here...
            </div>
        </div>
    );
}

import React from "react";
import Split from "react-split";
import "./threepanel.css";

export default function ThreePanelLayout({ left, middle, right }) {
    return (
        <div className="three-panel-container">

            {/* Horizontal split → Left | Middle | Right */}
            <Split
                direction="horizontal"
                sizes={[25, 25, 50]}
                minSize={180}
                gutterSize={8}
                className="horizontal-panels"
            >
                {/* LEFT COLUMN */}
                <div className="panel">{left}</div>

                {/* MIDDLE COLUMN */}
                <div className="panel">{middle}</div>

                {/* RIGHT COLUMN */}
                <div className="panel">{right}</div>
            </Split>

        </div>
    );
}

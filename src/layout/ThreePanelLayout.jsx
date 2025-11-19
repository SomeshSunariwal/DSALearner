import React from "react";
import Split from "react-split";
import "./threepanel.css";

export default function ThreePanelLayout({ left, middle, rightTop, rightBottom }) {
    return (
        <div className="three-panel-container">
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

                {/* RIGHT COLUMN (top editor + bottom output split vertically) */}
                <Split
                    direction="vertical"
                    sizes={[75, 25]}
                    minSize={100}
                    gutterSize={8}
                    className="vertical-right-split"
                >
                    <div className="panel">{rightTop}</div>
                    <div className="panel">{rightBottom}</div>
                </Split>
            </Split>
        </div>
    );
}

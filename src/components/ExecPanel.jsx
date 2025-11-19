import React, { useState } from "react";
import "./execpanel.css";
import ElectricBorder from "../UIComp/ElectricBorder";
import GlareHover from "../UIComp/GlareHover";

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

            <div className="exec-buttons">

                {/* Run button (glare) */}
                <div>
                    <GlareHover glareColor="#ffffff"
                        glareOpacity={0.3}
                        glareAngle={-30}
                        glareSize={300}
                        transitionDuration={800}
                        playOnce={false}>

                        <button className="exec-btn exec-btn-run">Run</button>
                    </GlareHover>
                </div>

                {/* Submit button with electric border */}
                <div >
                    <ElectricBorder color="#00eaff" speed={1.5} chaos={1.2} thickness={2}>
                        <button className="exec-btn exec-btn-submit">Submit</button>
                    </ElectricBorder>
                </div>

            </div>


            {/* OUTPUT BOX */}
            <div className="exec-output">
                Output will appear here...
            </div>
        </div>
    );
}

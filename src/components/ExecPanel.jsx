import React, { useState, useEffect, useRef } from "react";
import "./execpanel.css";
import ElectricBorder from "../UIComp/ElectricBorder";
import GlareHover from "../UIComp/GlareHover";
import { useDispatch, useSelector } from "react-redux";
import { fetchRunCodeStart } from "../data_store/run_code_store";

export default function ExecPanel() {
    const dispatch = useDispatch();

    const [input, setInput] = useState("");
    const [output, setOutput] = useState("Output will appear here...");
    const hasRunRef = useRef(false); // 👈 KEY FIX

    const { data, loading, error } = useSelector(state => state.runCode);

    /* ============================= */
    /* RUN BUTTON CLICK */
    /* ============================= */
    const handleRun = () => {
        if (!window.currentCode?.trim()) {
            setOutput("❌ No code found in editor");
            return;
        }

        setOutput("Running...");

        dispatch(fetchRunCodeStart({
            language: window.currentLanguage,
            code: window.currentCode,
            stdin: input,
            mode: window.currentMode
        }));
    };

    const handleSubmit = () => {
        /////////////////////////////////////////////////
        /////////////////////////////////////////////////
        //////////       Handle Submit    ///////////////
        /////////////////////////////////////////////////
        /////////////////////////////////////////////////
        console.log("Handle Submit ");

    }

    /* ============================= */
    /* HANDLE SAGA RESULT */
    /* ============================= */
    useEffect(() => {
        if (!data) return;

        if (data.success) {
            const out =
                data.run?.stdout ||
                data.stdout ||
                "";

            setOutput(out || "");
        } else {
            const err =
                data.compile?.stderr ||
                data.run?.stderr ||
                data.error ||
                output;

            setOutput(err);
        }
    }, [data]);

    /* ============================= */
    /* HANDLE ERROR */
    /* ============================= */
    useEffect(() => {
        if (!hasRunRef.current || !error) return;
        setOutput(error);
    }, [error]);


    return (
        <div className="exec-container">

            {/* INPUT */}
            <div className="exec-input-wrapper">
                <strong className="exec-input-label">Input</strong>

                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter input here..."
                    className="exec-input-area"
                />
            </div>

            {/* BUTTONS */}
            <div className="exec-buttons">

                <GlareHover
                    glareColor="#ffffff"
                    glareOpacity={0.3}
                    glareAngle={-30}
                    glareSize={300}
                    transitionDuration={800}
                    playOnce={false}
                >
                    <button
                        type="button"
                        className="exec-btn exec-btn-run"
                        onClick={handleRun}
                        disabled={loading}
                    >
                        {loading ? "Running..." : "Run"}
                    </button>
                </GlareHover>

                <ElectricBorder color="#00eaff" speed={1.5} chaos={1.2} thickness={2}>
                    <button
                        type="button"
                        className="exec-btn exec-btn-submit"
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                </ElectricBorder>
            </div>

            {/* OUTPUT */}
            <div className="exec-output">
                <pre style={{ whiteSpace: "pre-wrap", margin: 0 }}>
                    {output}
                </pre>
            </div>
        </div>
    );
}

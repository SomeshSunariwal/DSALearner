import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function ProblemStatement() {

    const { data, loading, error } = useSelector((state) => state.problem);

    const [problem, setProblem] = useState({
        ProblemName: "",
        Description: "",
        Constraints: "",
        SampleInputs: [],
        SampleOutputs: [],
        TestCaseInputs: [],
        TestCaseOutputs: []
    });

    // Sync Redux → Local State
    useEffect(() => {
        if (!data) return;

        setProblem({
            ProblemName: data.ProblemName || "",
            Description: data.Description || "",
            Constraints: data.Constraints || "",
            SampleInputs: data.SampleInputs || [],
            SampleOutputs: data.SampleOutputs || [],
            TestCaseInputs: data.TestCaseInputs || [],
            TestCaseOutputs: data.TestCaseOutputs || []
        });
    }, [data]);

    const {
        ProblemName,
        Description,
        Constraints,
        SampleInputs,
        SampleOutputs
    } = problem;

    // -------------------------
    // STATUS HANDLING
    // -------------------------
    if (loading) {
        return (
            <div style={{ padding: "20px" }}>
                <h2>Loading problem… 🔄</h2>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ padding: "20px", color: "red" }}>
                <h2>Error loading problem ❌</h2>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div
            style={{
                padding: "20px",
                maxHeight: "100vh",
                overflowY: "auto",
                fontFamily: "Inter, sans-serif",
                lineHeight: "1.6"
            }}
        >
            {/* Header */}
            <h1 style={{ marginBottom: "10px", fontSize: "28px" }}>
                {ProblemName || "Select a problem"}
            </h1>

            <hr style={{ margin: "16px 0" }} />

            {/* Description */}
            <div style={{ marginBottom: "20px" }}>
                <h2 style={{ fontSize: "20px", marginBottom: "8px" }}>📝 Description</h2>
                <div style={{ whiteSpace: "pre-wrap" }}>
                    {Description || "No description available."}
                </div>
            </div>

            {/* Constraints */}
            <div style={{ marginBottom: "20px" }}>
                <h2 style={{ fontSize: "20px", marginBottom: "8px" }}>📌 Constraints</h2>

                <pre
                    style={{
                        background: "#1e1e1e",
                        color: "#dcdcdc",
                        padding: "12px",
                        borderRadius: "6px",
                        overflowX: "auto",
                        fontSize: "14px"
                    }}
                >
                    {Constraints || "No constraints available."}
                </pre>
            </div>

            {/* Sample Testcases */}
            <div style={{ marginBottom: "20px" }}>
                <h2 style={{ fontSize: "20px", marginBottom: "8px" }}>🧪 Sample Testcases</h2>

                {(SampleInputs && SampleInputs.length > 0) ? (
                    SampleInputs.map((sampleObj, index) => {
                        const inputKey = Object.keys(sampleObj)[0];
                        const inputValue = sampleObj[inputKey];

                        const outputObj = SampleOutputs[index] || {};
                        const outputKey = Object.keys(outputObj)[0];
                        const outputValue = outputObj[outputKey];

                        return (
                            <div
                                key={index}
                                style={{
                                    marginBottom: "20px",
                                    padding: "10px",
                                    borderBottom: "1px solid #aaa"
                                }}
                            >
                                {/* Input */}
                                <h3 style={{ marginBottom: "6px" }}>
                                    🔤 Input {index + 1}:
                                </h3>

                                <pre
                                    style={{
                                        background: "#1e1e1e",
                                        color: "#dcdcdc",
                                        padding: "12px",
                                        borderRadius: "6px",
                                        overflowX: "auto",
                                        fontSize: "14px"
                                    }}
                                >
                                    {inputValue}
                                </pre>

                                {/* Output */}
                                <h3 style={{ marginBottom: "6px", marginTop: "12px" }}>
                                    📤 Output {index + 1}:
                                </h3>

                                <pre
                                    style={{
                                        background: "#1e1e1e",
                                        color: "#dcdcdc",
                                        padding: "12px",
                                        borderRadius: "6px",
                                        overflowX: "auto",
                                        fontSize: "14px"
                                    }}
                                >
                                    {outputValue || "No output provided."}
                                </pre>
                            </div>
                        );
                    })
                ) : (
                    <p>No sample testcases available.</p>
                )}
            </div>
        </div>
    );
}

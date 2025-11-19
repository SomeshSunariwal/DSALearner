import { useSelector } from "react-redux";

export default function ProblemStatement() {
    const {
        ProblemName,
        Description,
        Constraints,
        SampleInput,
        SampleOutput
    } = useSelector((state) => state.problem);

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

            {/* Markdown-style horizontal line */}
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

            <div style={{ marginBottom: "20px" }}>
                <h2 style={{ fontSize: "20px", marginBottom: "8px" }}>🧪 Sample Testcases</h2>

                {(SampleInput && SampleInput.length > 0) ? (
                    SampleInput.map((sampleObj, index) => {
                        // Input text
                        const inputKey = Object.keys(sampleObj)[0];
                        const inputValue = sampleObj[inputKey];

                        // Output text (same index)
                        const outputObj = SampleOutput[index] || {};
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

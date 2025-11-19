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

            {/* Sample Input */}
            <div style={{ marginBottom: "20px" }}>
                <h2 style={{ fontSize: "20px", marginBottom: "8px" }}>🔤 Sample Input</h2>

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
                    {Array.isArray(SampleInput) && SampleInput.length
                        ? SampleInput.join("\n")
                        : "No sample input available."}
                </pre>
            </div>

            {/* Sample Output */}
            <div style={{ marginBottom: "20px" }}>
                <h2 style={{ fontSize: "20px", marginBottom: "8px" }}>📤 Sample Output</h2>

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
                    {Array.isArray(SampleOutput) && SampleOutput.length
                        ? SampleOutput.join("\n")
                        : "No sample output available."}
                </pre>
            </div>
        </div>
    );
}

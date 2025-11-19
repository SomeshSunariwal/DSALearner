import axios from "axios";

const BASE_URL = "http://localhost:5000";

// language: cpp | c | python | java
// code: string
// stdin: string or ""
// mode: "local" or "docker"
export async function runCode({ language, code, stdin, mode }) {
    try {
        const endpoint =
            mode === "docker"
                ? `${BASE_URL}/run/docker`
                : `${BASE_URL}/run/local`;

        const response = await axios.post(endpoint, {
            language,
            code,
            stdin,
        });

        return response.data;
    } catch (err) {
        return {
            success: false,
            error: err?.response?.data?.error || err.message,
        };
    }
}

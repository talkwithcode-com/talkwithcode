import axios from "axios"

const client = axios.create({ baseURL: "http://localhost:3001" })

export function runCode(sourceCode, lang) {
    if (lang === "javascript") {
        lang = "js"
    }
    const data = {
        source_code: sourceCode,
        language: lang,
        inputs: [""],
    }
    return client.post("/run", data)
}

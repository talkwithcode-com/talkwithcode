import React, { useCallback, useState } from "react"

const langs = [
    { name: "Go", value: "go" },
    { name: "JavaScript", value: "javascript" },
    { name: "Markdown", value: "markdown" },
]
export const LanguageContext = React.createContext({
    langs: langs,
    value: "go",

    updateValue: (_) => {},
})

const LanguageProvider = ({ children }) => {
    const [value, setValue] = useState("go")

    const updateValue = useCallback((value) => {
        setValue(value)
    }, [])

    return (
        <LanguageContext.Provider
            value={{
                value,
                langs,
                updateValue,
            }}
        >
            {children}
        </LanguageContext.Provider>
    )
}

export default LanguageProvider

import React, { useCallback, useState } from "react"

const defaultValue = ``

export const DocumentContext = React.createContext({
    defaultValue: defaultValue,
    value: "",

    updateValue: (_) => {},
})

const DocumentProvider = ({ children }) => {
    const [value, setValue] = useState(defaultValue)

    const updateValue = useCallback((value) => {
        setValue(value)
    }, [])

    return (
        <DocumentContext.Provider
            value={{
                value,
                defaultValue,
                updateValue,
            }}
        >
            {children}
        </DocumentContext.Provider>
    )
}

export default DocumentProvider

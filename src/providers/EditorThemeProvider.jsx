import React from "react"
import EditorTheme from "../themes/EditorTheme"
import { twcDarkTheme, twcLightTheme } from "../themes/twcTheme"

export const EditorThemeProvider = ({
    children,
    colorMode,
    syntaxLightTheme,
    syntaxDarkTheme,
}) => {
    const syntaxTheme = {
        light: syntaxLightTheme || twcLightTheme,
        dark: syntaxDarkTheme || twcDarkTheme,
    }

    return (
        <EditorTheme colorMode={colorMode} syntaxTheme={syntaxTheme}>
            {children}
        </EditorTheme>
    )
}

export default EditorThemeProvider

import React, { useContext, useEffect, useRef, useState } from "react"
import { Flex, Textarea, useColorMode } from "@chakra-ui/core"

import CodeMirror from "./engine/CodeMirror"
import EditorToolbars from "./EditorToolbars"
import useEditorTheme from "../../hooks/useEditorTheme"
import { LanguageContext } from "../../providers/LanguageProvider"
import EditorThemeProvider from "../../providers/EditorThemeProvider"

const Editor = ({ updateValue }) => {
    const [editor, setEditor] = useState()
    const { colorMode } = useColorMode()
    const { theme } = useEditorTheme()
    const textareaRef = useRef(null)

    const { value: mode } = useContext(LanguageContext)

    useEffect(() => {
        const _editor = new CodeMirror(textareaRef.current, {
            lineNumbers: true,
            lineWrapping: true,
            scrollbarStyle: "null",
            theme: "eclipse",
            mode: "go",
        })
        setEditor(_editor)
    }, [])

    useEffect(() => {
        if (editor) editor.updateTheme(theme)
    }, [editor, theme])

    useEffect(() => {
        if (editor) editor.updateMode(mode)
    }, [editor, mode])

    useEffect(() => {
        if (editor) editor.onValueChange(updateValue)
    }, [updateValue, editor])

    return (
        <Flex flex={1} flexDirection="column" zIndex={10}>
            <EditorThemeProvider colorMode={colorMode}>
                <EditorToolbars />
                <Textarea onChange={console.log} ref={textareaRef} />
            </EditorThemeProvider>
        </Flex>
    )
}

export default React.memo(Editor)

import { Flex, Textarea, useColorMode } from "@chakra-ui/core"
import React, {
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react"
import useEditorTheme from "../../hooks/useEditorTheme"
import EditorThemeProvider from "../../providers/EditorThemeProvider"
import { LanguageContext } from "../../providers/LanguageProvider"
import EditorFooter from "./EditorFooter"
import EditorToolbars from "./EditorToolbars"
import CodeMirror from "./engine/CodeMirror"

const Editor = ({ updateValue, onRun, onSubmit }) => {
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
        if (editor && updateValue) editor.onValueChange(updateValue)
    }, [updateValue, editor])

    const handleRun = useCallback(() => {
        if (editor) {
            onRun(editor.getValue())
        }
    }, [editor, onRun])

    const handleSubmit = useCallback(() => {
        if (editor) {
            onSubmit(editor.getValue())
        }
    }, [editor, onSubmit])

    return (
        <Flex
            flex={1}
            flexDirection="column"
            zIndex={10}
            borderRadius="4"
            overflow="hidden"
        >
            <EditorThemeProvider colorMode={colorMode}>
                <EditorToolbars />
                <Textarea onChange={console.log} ref={textareaRef} />
                <EditorFooter onRun={handleRun} onSubmit={handleSubmit} />
            </EditorThemeProvider>
        </Flex>
    )
}

export default Editor

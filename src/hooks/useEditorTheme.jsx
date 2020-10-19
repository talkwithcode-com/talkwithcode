import { useColorMode } from "@chakra-ui/core"

export default function useEditorTheme() {
    const { colorMode } = useColorMode()
    const theme = colorMode === "dark" ? "dracula" : "eclipse"
    return { theme }
}

import { theme } from "@chakra-ui/core"

const fonts = {
    ...theme.fonts,
    mono: `'Menlo', monospace`,
    body: `Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`,
}

const customTheme = {
    ...theme,
    fonts,
    colors: {
        ...theme.colors,
        black: "#16161D",
    },
}

export default customTheme

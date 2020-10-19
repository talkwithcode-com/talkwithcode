import React, { useContext } from "react"
import { GoCode } from "react-icons/go"
import {
    Box,
    FormControl,
    IconButton,
    Select,
    Stack,
    useColorMode,
} from "@chakra-ui/core"

import { LanguageContext } from "../../providers/LanguageProvider"

const EditorToolbarsTheme = {
    bg: {
        dark: "gray.700",
        light: "gray.200",
    },
    color: {
        dark: "gray.400",
        light: "gray.700",
    },
}

const EditorToolbars = () => {
    const { colorMode, toggleColorMode } = useColorMode()
    const { langs, updateValue, value } = useContext(LanguageContext)

    return (
        <Stack
            isInline
            p="1"
            pr="2"
            spacing="3"
            fontSize="lg"
            display="flex"
            alignItems="center"
            bg={EditorToolbarsTheme.bg[colorMode]}
            color={EditorToolbarsTheme.color[colorMode]}
        >
            <Box as={GoCode} mx={2} />

            <FormControl ml="auto" fontSize="xs">
                <Select
                    size="sm"
                    fontSize="sm"
                    defaultValue={value}
                    bg={colorMode === "light" ? "gray.50" : "gray.600"}
                    onChange={(e) => updateValue(e.target.value)}
                >
                    {langs.map((e) => (
                        <option key={e.value} value={e.value}>
                            {e.name}
                        </option>
                    ))}
                </Select>
            </FormControl>
            <IconButton
                aria-label="toggle-theme"
                icon={colorMode === "light" ? "moon" : "sun"}
                onClick={toggleColorMode}
                size="sm"
            />
        </Stack>
    )
}

export default EditorToolbars

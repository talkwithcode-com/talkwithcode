import { Button, Flex, Stack, useColorMode } from "@chakra-ui/core"
import React from "react"

const EditorFooterTheme = {
    bg: {
        dark: "gray.700",
        light: "gray.200",
    },
    color: {
        dark: "gray.400",
        light: "gray.700",
    },
}

const EditorFooter = ({ onRun, onSubmit }) => {
    const { colorMode } = useColorMode()
    return (
        <Stack
            isInline
            spacing="3"
            fontSize="lg"
            display="flex"
            direction="column"
            bg={EditorFooterTheme.bg[colorMode]}
            color={EditorFooterTheme.color[colorMode]}
        >
            <Flex align="center" w="100%" py="2" fontSize="sm" px="4">
                <Button
                    w="100px"
                    ml="auto"
                    size="sm"
                    variant="outline"
                    variantColor="green"
                    onClick={onRun}
                >
                    Run
                </Button>
                <Button
                    onClick={onSubmit}
                    w="100px"
                    ml="6"
                    size="sm"
                    variantColor="green"
                >
                    Submit
                </Button>
            </Flex>
        </Stack>
    )
}

export default EditorFooter

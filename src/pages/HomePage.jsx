import React from "react"
import { Flex, Heading, IconButton, useColorMode } from "@chakra-ui/core"

export default function HomePage() {
    const { toggleColorMode, colorMode } = useColorMode()
    return (
        <Flex h="100vh" w="100%" align="center" justify="center">
            <IconButton
                mr="4"
                aria-label="toogle theme"
                onClick={toggleColorMode}
                icon={colorMode === "dark" ? "sun" : "moon"}
            />
            <Heading>Welcome</Heading>
        </Flex>
    )
}

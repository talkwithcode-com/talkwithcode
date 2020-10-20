import React, { useContext } from "react"
import { Flex, Stack, useColorMode } from "@chakra-ui/core"
import { Editor, ResultCard, QuestionView } from "../components"
import { DocumentContext } from "../providers/DocumentProvider"

export default function PageRoom() {
    const { colorMode } = useColorMode()

    const { defaultValue, updateValue } = useContext(DocumentContext)

    return (
        <Flex w="100%" h="100vh">
            <Flex
                flex="1"
                bg={colorMode === "light" ? "gray.200" : "gray.700"}
                direction="column"
                maxW="50%"
            >
                <Editor defaultValue={defaultValue} updateValue={updateValue} />
                <ResultCard />
            </Flex>
            <Stack flex="1" spacing={8}>
                <QuestionView />
            </Stack>
        </Flex>
    )
}

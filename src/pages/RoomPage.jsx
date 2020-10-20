import React, { useContext } from "react"
import { Flex, useColorMode } from "@chakra-ui/core"

import { Editor } from "../components"
import { DocumentContext } from "../providers/DocumentProvider"
import { LanguageContext } from "../providers/LanguageProvider"
import ResultCard from "../components/ResultCard"

export default function PageRoom() {
    const { colorMode } = useColorMode()
    const { defaultValue, updateValue, value: code } = useContext(
        DocumentContext
    )
    const { value: language } = useContext(LanguageContext)

    console.log({ code, language })

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
            <Flex flex="1"></Flex>
        </Flex>
    )
}

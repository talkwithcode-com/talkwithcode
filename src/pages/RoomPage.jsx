import React, { useContext } from "react"
import { Flex } from "@chakra-ui/core"

import { Editor } from "../components"
import { DocumentContext } from "../providers/DocumentProvider"
import { LanguageContext } from "../providers/LanguageProvider"

export default function PageRoom() {
    const { defaultValue, updateValue, value: code } = useContext(
        DocumentContext
    )
    const { value: language } = useContext(LanguageContext)

    console.log({ code, language })

    return (
        <Flex w="100%" h="100vh">
            <Flex flex="1" bg="blue.500" direction="column">
                <Editor defaultValue={defaultValue} updateValue={updateValue} />
                <Flex h="50px" bg="purple.500"></Flex>
            </Flex>
            <Flex flex="1" bg="red.500"></Flex>
        </Flex>
    )
}

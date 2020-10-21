import React, { useContext, useEffect, useState } from "react"
import { useQuery } from "@apollo/client"
import { Flex, Spinner, Stack, useColorMode } from "@chakra-ui/core"
import { Editor, ResultCard, QuestionView } from "../components"
import { LanguageContext } from "../providers/LanguageProvider"
import { getToken } from "../helpers/auth"

import { GET_QUESTION } from "../graphql/codeSanbox"

export default function PageRoom() {
    const { colorMode } = useColorMode()
    const { data, loading } = useQuery(GET_QUESTION, {
        variables: {
            access_token: getToken(),
        },
    })

    const { value: lang } = useContext(LanguageContext)
    const [code, setCode] = useState("")

    if (loading) {
        return (
            <Flex flex="1" justify="center" align="center">
                <Spinner
                    thickness="2px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="blue.500"
                    size="md"
                />
            </Flex>
        )
    }

    const { questions } = data

    return (
        <Flex w="100%" h="100vh">
            <Flex
                flex="1"
                bg={colorMode === "light" ? "gray.200" : "gray.700"}
                direction="column"
                maxW="50%"
            >
                <Editor value="" updateValue={setCode} />
            </Flex>
            <Stack flex="1" spacing={8}>
                <QuestionView questions={questions} />
            </Stack>
        </Flex>
    )
}

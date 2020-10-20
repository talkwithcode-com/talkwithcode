import React, { useContext, useEffect, useState } from "react"
import { Flex, Stack, useColorMode } from "@chakra-ui/core"
import { Editor, ResultCard, QuestionView } from "../components"
import { LanguageContext } from "../providers/LanguageProvider"

import temp from "../temp/question"

export default function PageRoom() {
    const { colorMode } = useColorMode()

    const { value: lang } = useContext(LanguageContext)
    const [questions, setQuestions] = useState([])
    const [code, setCode] = useState("")
    const [active, setActive] = useState(0)

    useEffect(() => {
        const quests = temp.questions
        setQuestions(quests)
    }, [])

    return (
        <Flex w="100%" h="100vh">
            <Flex
                flex="1"
                bg={colorMode === "light" ? "gray.200" : "gray.700"}
                direction="column"
                maxW="50%"
            >
                <Editor value="" updateValue={setCode} />
                <ResultCard
                    data={{ code, lang, question_id: questions[active] }}
                />
            </Flex>
            <Stack flex="1" spacing={8}>
                <QuestionView
                    questions={questions}
                    onChange={(i) => setActive(i)}
                />
            </Stack>
        </Flex>
    )
}

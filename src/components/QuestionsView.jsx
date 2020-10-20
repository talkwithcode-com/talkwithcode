import React, { useEffect, useState } from "react"
import {
    Accordion,
    AccordionHeader,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Heading,
} from "@chakra-ui/core"
import MdView from "./mdv"
import temp from "../temp/question"
import parser from "../lib/exampleUnified"

function QuestionView() {
    const [questions, setQuestions] = useState([])

    useEffect(() => {
        setQuestions(temp.questions)
    }, [])
    return (
        <Accordion p="2" flex="1" onChange={(index) => console.log(index)}>
            {questions.map((q) => {
                return (
                    <AccordionItem py="4" key={q.id}>
                        <AccordionHeader>
                            <Box flex="1" textAlign="left">
                                <Heading fontSize="lg">{q.title}</Heading>
                            </Box>
                            <AccordionIcon />
                        </AccordionHeader>
                        <AccordionPanel maxH="500px" overflowY="auto">
                            <MdView __html={parser(q.description).__html} />
                        </AccordionPanel>
                    </AccordionItem>
                )
            })}
        </Accordion>
    )
}

export default React.memo(QuestionView)

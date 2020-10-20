import React from "react"
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
import parser from "../lib/exampleUnified"

function QuestionView({ questions, onChange }) {
    return (
        <Accordion p="2" flex="1" onChange={onChange}>
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

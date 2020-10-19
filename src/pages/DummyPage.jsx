import React, { useEffect, useState } from "react"
import {
    Accordion,
    AccordionItem,
    AccordionHeader,
    Flex,
    Heading,
    Box,
    AccordionIcon,
    AccordionPanel,
    Stack,
} from "@chakra-ui/core"
import exampleUnified from "../components/exampleUnified"

export default function DummyPage() {
    /*
        Example state => nanti tinggal diganti data asli
    */
    const [problem, setProblem] = useState([
        "# Hello world!1",
        "# Hello world!2",
        "# Hello world!3",
    ])

    return (
        <>
            {console.log(exampleUnified)}
            <Flex w="100%" h="100vh">
                <Flex flex="1" bg="blue.500" direction="column" padding="2">
                    <Flex flex="1" bg="green.500"></Flex>
                    <Flex flex="1" bg="purple.500"></Flex>
                </Flex>
                <Flex flex="1" bg="red.500">
                    <Stack flex="1" spacing={8}>
                        <Accordion>
                            {problem.map((eachProblem, index) => {
                                return (
                                    <AccordionItem key={index}>
                                        <AccordionHeader>
                                            <Box flex="1" textAlign="left">
                                                <Heading>
                                                    Problem {index}
                                                </Heading>
                                            </Box>
                                            <AccordionIcon />
                                        </AccordionHeader>
                                        <AccordionPanel pb={4}>
                                            <div
                                                dangerouslySetInnerHTML={exampleUnified(
                                                    eachProblem
                                                )}
                                            />
                                        </AccordionPanel>
                                    </AccordionItem>
                                )
                            })}
                        </Accordion>
                    </Stack>
                </Flex>
            </Flex>
        </>
    )
}

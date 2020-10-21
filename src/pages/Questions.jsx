import React, { useState, useEffect } from "react"
import { Text, Flex, Heading } from "@chakra-ui/core"
import Sidebar from "../components/Sidebar"
import TableBody from "../components/TableBody"
import { useQuery } from '@apollo/client'
import { GET_QUESTIONS } from "../graphql/index"


export default function Questions() {
    const { data, loading, error, refetch } = useQuery(GET_QUESTIONS)
    
    // const [questions, setQuestions] = useState([
    //     {
    //         _id: "title id 1",
    //         title: "title 1",
    //         description: "description 1",
    //         score: 10,
    //         timeLimit: 40,
    //     },
    //     {
    //         _id: "title id 2",
    //         title: "title 2",
    //         description: "description 2",
    //         score: 10,
    //         timeLimit: 40,
    //     },
    //     {
    //         _id: "title id 3",
    //         title: "title 3",
    //         description: "description 3",
    //         score: 10,
    //         timeLimit: 40,
    //     },
    // ])

    return (
        <>
            <Flex w="100%" h="100vh">
                <Flex flex="1" bg="#56657F" direction="column" padding="2">
                    <Sidebar />
                </Flex>
                <Flex
                    flex="4"
                    direction="column"
                    bg="gray.800"
                    alignItems="center"
                    overflow="auto"
                >
                    <Heading mt="5" color="white">
                        List of Questions
                    </Heading>
                    {data?.questions.map((question) => {
                        return (
                            <TableBody key={question._id} question={question} />
                        )
                    })}
                </Flex>

                {/* dibawah ini tampilan ke 2 link chat di discord: https://discord.com/channels/@me/766206736579035156/768103201755889674 
                <Flex
                    flex="4"
                    direction="column"
                    bg="gray.800"
                    alignItems="center"
                >
                    <Heading mt="5" color="white">
                        List of Questions
                    </Heading>
                    <Flex>
                        {questions.map((question) => {
                            return (
                                <TableBody
                                    key={question._id}
                                    question={question}
                                />
                            )
                        })}
                    </Flex>
                </Flex> */}
            </Flex>
        </>
    )
}

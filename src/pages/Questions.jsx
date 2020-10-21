import React, { useState, useEffect } from "react"
import { Text, Flex, Heading } from "@chakra-ui/core"
import Sidebar from "../components/Sidebar"
import TableBody from "../components/TableBody"
import { useQuery } from "@apollo/client"
import { GET_QUESTIONS } from "../graphql/index"

export default function Questions() {
    const { data, loading, error, refetch } = useQuery(GET_QUESTIONS, {
        variables: {
            access_token: localStorage.getItem("access_token"),
        },
    })

    return (
        <>
            {console.log(data)}
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
            </Flex>
        </>
    )
}

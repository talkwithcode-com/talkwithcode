import { Flex } from "@chakra-ui/core"
import React from "react"
import Sidebar from "../components/Sidebar"

export default function Dashboard() {
    return (
        <>
            <Flex w="100%" h="100vh">
                <Flex flex="1" bg="#56657F" direction="column" padding="2">
                    <Sidebar />
                </Flex>
                <Flex flex="4" bg="red.500"></Flex>
            </Flex>
        </>
    )
}

import React, { useState } from "react"
import { Text, Flex, Heading, Button } from "@chakra-ui/core"
import Sidebar from "../components/Sidebar"
import TableBody from "../components/TableBody"
import { Link } from "react-router-dom"

export default function Rooms() {
    const [rooms, setRooms] = useState([
        {
            id: "id 1",
            title: "title1",
            time_start: "20/10/2020 20:00",
            time_end: "20/10/2020 21:00",
            ids: [
                {
                    _id: "title id 1",
                    title: "title 1",
                    description: "description 1",
                    score: 10,
                    timeLimit: 40,
                },
                {
                    _id: "title id 2",
                    title: "title 2",
                    description: "description 2",
                    score: 10,
                    timeLimit: 40,
                },
                {
                    _id: "title id 3",
                    title: "title 3",
                    description: "description 3",
                    score: 10,
                    timeLimit: 40,
                },
            ],
        },
        {
            id: "id 2",
            title: "title2",
            time_start: "20/10/2020 20:00",
            time_end: "20/10/2020 21:00",
            ids: [
                {
                    _id: "title id 1",
                    title: "title 1",
                    description: "description 1",
                    score: 10,
                    timeLimit: 40,
                },
                {
                    _id: "title id 2",
                    title: "title 2",
                    description: "description 2",
                    score: 10,
                    timeLimit: 40,
                },
                {
                    _id: "title id 3",
                    title: "title 3",
                    description: "description 3",
                    score: 10,
                    timeLimit: 40,
                },
            ],
        },
        {
            id: "id 3",
            title: "title3",
            time_start: "20/10/2020 20:00",
            time_end: "20/10/2020 21:00",
            ids: [
                {
                    _id: "title id 1",
                    title: "title 1",
                    description: "description 1",
                    score: 10,
                    timeLimit: 40,
                },
                {
                    _id: "title id 2",
                    title: "title 2",
                    description: "description 2",
                    score: 10,
                    timeLimit: 40,
                },
                {
                    _id: "title id 3",
                    title: "title 3",
                    description: "description 3",
                    score: 10,
                    timeLimit: 40,
                },
            ],
        },
    ])
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
                    <Flex align="center" w="80%" mb="5">
                        <Flex flex="4">
                            <Heading
                                mt="5"
                                ml="10"
                                color="white"
                                justifyContent="center"
                                alignSelf="center"
                            >
                                List of Rooms
                            </Heading>
                        </Flex>
                        <Flex mt="5" flex="1" justify="end">
                            <Link to="/join-room">
                                <Button variantColor="teal" variant="outline">
                                    Join Room
                                </Button>
                            </Link>
                        </Flex>
                    </Flex>

                    {rooms.map((room) => {
                        return <TableBody key={room.ids} room={room} />
                    })}
                </Flex>
            </Flex>
        </>
    )
}

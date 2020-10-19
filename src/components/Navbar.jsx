import React, { useState } from "react"
import { Box, Button, Flex, Heading } from "@chakra-ui/core"
import { VscDebugAlt2 } from "react-icons/vsc"

export default function Navbar() {
    const [isRoomPage, setRoomStatus] = useState(true)

    function changeButton() {
        if (isRoomPage) {
            setRoomStatus(false)
        } else {
            setRoomStatus(true)
        }
    }
    return (
        <Flex w="100%" h="10vh" align="center">
            <Flex flex="1">
                <Box
                    as={VscDebugAlt2}
                    size="28px"
                    ml="5"
                    mr="2"
                    color="green.400"
                />
                <Heading as="h4" color="green.400" variant="outline">
                    TwCode
                </Heading>
            </Flex>
            <Flex flex="1" justify="end" mr="5">
                {isRoomPage ? (
                    <Button
                        variantColor="teal"
                        variant="outline"
                        onClick={changeButton}
                    >
                        I'm Done
                    </Button>
                ) : (
                    <Button
                        variantColor="teal"
                        variant="outline"
                        onClick={changeButton}
                    >
                        Logout
                    </Button>
                )}
            </Flex>
        </Flex>
    )
}

import React, { useState } from "react"
import Sidebar from "../components/Sidebar"
import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Textarea,
    Text,
    Heading,
    Select,
} from "@chakra-ui/core"

export default function JoinRoom() {
    const [passcode, setPasscode] = useState("")

    function passcodeChange(event) {
        setPasscode(event.target.value)
    }

    function onSubmitPasscode(event) {
        event.preventDefault()
        console.log(passcode)
    }

    return (
        <>
            <Flex w="100%" h="100vh">
                <Flex flex="1" bg="#56657F" direction="column" padding="2">
                    <Sidebar />
                </Flex>
                <Flex
                    flex="4"
                    bg="gray.800"
                    direction="column"
                    align="center"
                    justify="center"
                >
                    <Heading color="white">Join Room</Heading>
                    <Heading as="h4" size="md" color="white">
                        <i>
                            "Talk is cheap. Show me the code." ~Linus Torvalds
                        </i>
                    </Heading>
                    <form onSubmit={onSubmitPasscode}>
                        <FormControl margin={4} pb={4} w="100%">
                            <FormLabel color="white">
                                Input your Passcode
                            </FormLabel>
                            <Textarea
                                name="passcode"
                                type="text"
                                value={passcode}
                                placeholder="e.g 160**********"
                                onChange={passcodeChange}
                            />
                        </FormControl>
                        <Button
                            margin={4}
                            variantColor="green"
                            variant="solid"
                            type="submit"
                        >
                            <Text>Submit</Text>
                        </Button>
                    </form>
                </Flex>
            </Flex>
        </>
    )
}

import React, { useState } from "react"
import { useMutation } from "@apollo/client"
import { useHistory } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Textarea,
    Text,
    Heading,
} from "@chakra-ui/core"
import { getToken } from "../helpers/auth"
import { VALIDATE_ROOM_CODE } from "../graphql/codeSanbox"

export default function JoinRoom() {
    const [passcode, setPasscode] = useState("")
    const history = useHistory()

    function passcodeChange(event) {
        setPasscode(event.target.value)
    }

    const [validateCode] = useMutation(VALIDATE_ROOM_CODE)

    function onSubmitPasscode(event) {
        event.preventDefault()
        validateCode({
            variables: {
                key: passcode,
                access_token: getToken(),
            },
        }).then(({ data: { validateChannelToken } }) => {
            console.log(validateChannelToken.questions)
            const res = JSON.parse(validateChannelToken.questions[0])
            const id = res.questions[0]._id
            history.replace("/sandbox/" + id)
            localStorage.setItem("roomcode", passcode)
        })
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

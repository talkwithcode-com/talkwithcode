import React from 'react'
import { Flex, Text, Button,Box } from '@chakra-ui/core'
import { VscDebugAlt2 } from "react-icons/vsc"


export default function LandingPage(props) {
   

    return (
        <>
            <Flex as="nav" align="center"
                mx="20" my="3" justify="space-between">
                <Flex>
                <Box
                    as={VscDebugAlt2}
                    size="28px"
                    ml="5"
                    mr="2"
                    color="green.400"
                />
                    <Text fontWeight="bold">TalkWithCode</Text>
                </Flex>
                <Flex>
                    {/* <Text paddingRight="10">tes1</Text>
                    <Text paddingRight="10">tes2</Text>
                    <Text paddingRight="10">tes3</Text> */}
                </Flex>
                <Flex>
                    <Button onClick={props.clickRegister} mr="2" variant="outline" color="gray.700" size="sm">Register</Button>
                    <Button onClick={props.clickLogin} variant="outline" color="gray.700" size="sm">Login</Button>
                </Flex>
            </Flex>
        </>
    )
}
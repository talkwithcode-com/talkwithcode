import React from 'react'
import { Flex, Text, Button } from '@chakra-ui/core'

export default function LandingPage(props) {
   

    return (
        <>
            <Flex as="nav" align="center"
                mx="20" my="3" justify="space-between">
                <Flex>
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
import React, { useState } from 'react'
import Nav from '../components/NavLanding'
import { Flex, Box, Text, Button, Heading, FormControl, FormLabel, Input, Stack, Link, useToast } from '@chakra-ui/core'
import back from '../img/back.png'


export default function LandingPage() {
    const [showLogin, setShowLogin] = useState(false)
    const [showRegister, setShowRegister] = useState(false)
    const toast = useToast()

    function clickLogin(event) {
        setShowLogin(true)
        setShowRegister(false)
    }

    function clickRegister(event) {
        setShowRegister(true)
        setShowLogin(false)

    }

    function buttonRegister(event) {
        toast({
            title: "Account created.",
            description: "We've created your account for you.",
            status: "success",
            duration: 2000,
            isClosable: true,
        })
    }

    function buttonLogin(event) {
        toast({
            title: "Login Success",
            description: "Happy nice day",
            status: "success",
            duration: 2000,
            isClosable: true,
        })
    }



    return (

        <>
            <Nav clickLogin={clickLogin} clickRegister={clickRegister} />
            <Flex flexDirection="column" h="90vh" w="100%" style={{ backgroundImage: `url(${back})`, backgroundRepeat: "no-repeat", backgroundSize: 'cover' }} >
                <Box w="100%" >
                    <Text fontSize="5xl" textAlign="center" fontWeight="bold">BLAA</Text>
                </Box>

                <Flex>
                    <Box w="70%" >
                    </Box>
                    <Flex align="center">
                        <Flex bg="green.50" align="flex-end">
                        </Flex>
                        {showLogin ? <Login buttonLogin={buttonLogin} /> : null}
                        {showRegister ? <Register buttonRegister={buttonRegister} /> : null}
                    </Flex>
                </Flex>
            </Flex>
        </>



    )
}



const Login = (props) => {
    return (
        <Flex>
            <Box
                backgroundColor="white"
                borderWidth={1}
                px={4}
                width='full'
                maxWidth='500px'
                borderRadius={4}
                textAlign='center'
                boxShadow='lg'
                mr="5"
            >
                <Box p="4">
                    <Box>
                        <Heading as="h4" size="md">Login To Your Account</Heading>
                        <Box my={8} textAlign='left'>
                            <form>

                                <FormControl>
                                    <FormLabel>Email address</FormLabel>
                                    <Input type='email' placeholder='Enter your email address' />
                                </FormControl>

                                <FormControl mt={4}>
                                    <FormLabel>Password</FormLabel>
                                    <Input type='password' placeholder='Enter your password' />
                                </FormControl>

                                <Stack isInline justifyContent='space-between' mt={4}>

                                    <Box>
                                        <Link color='teal.500' >Forgot your password?</Link>
                                    </Box>
                                </Stack>

                                <Button onClick={props.buttonLogin} variantColor='teal' width='full' mt={4}>Log In</Button>
                            </form>
                        </Box>
                    </Box>
                </Box>

            </Box>
        </Flex>
    )
}

const Register = (props) => {
    return (
        <Flex>
            <Box
                backgroundColor="white"
                borderWidth={1}
                px={4}
                width='full'
                maxWidth='500px'
                borderRadius={4}
                textAlign='center'
                boxShadow='lg'
                mr="5"
            >
                <Box p="4">
                    <Box>
                        <Heading as="h4" size="md">Sign In To Your Account</Heading>
                        <Box my={8} textAlign='left'>
                            <form>

                                <FormControl>
                                    <FormLabel>Name</FormLabel>
                                    <Input type='text' placeholder='Enter your Name' />
                                </FormControl>

                                <FormControl>
                                    <FormLabel>Email address</FormLabel>
                                    <Input type='email' placeholder='Enter your email address' />
                                </FormControl>

                                <FormControl mt={4}>
                                    <FormLabel>Password</FormLabel>
                                    <Input type='password' placeholder='Enter your password' />
                                </FormControl>

                                <Stack isInline justifyContent='space-between' mt={4}>

                                    
                                </Stack>

                                <Button onClick={props.buttonRegister} variantColor='teal' width='full' mt={4}>Sign In</Button>
                            </form>
                        </Box>
                    </Box>
                </Box>

            </Box>
        </Flex>
    )
}
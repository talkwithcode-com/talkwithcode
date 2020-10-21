import React, { useState } from "react"
import Nav from "../components/NavLanding"
import {
    Flex,
    Box,
    Text,
    Button,
    Heading,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Link,
    useToast,
} from "@chakra-ui/core"
import back from "../img/back.png"
import { POST_REGISTER, POST_LOGIN } from "../graphql/index"
import { useMutation } from "@apollo/client"
import { useHistory } from "react-router-dom"

export default function LandingPage() {
    const [showLogin, setShowLogin] = useState(false)
    const [showRegister, setShowRegister] = useState(false)
    const [registerForm, setRegisterForm] = useState({
        name: "",
        email: "",
        password: "",
    })
    const [loginForm, setLoginForm] = useState({
        email: "",
        password: "",
    })
    const toast = useToast()
    const [register] = useMutation(POST_REGISTER)
    const [login] = useMutation(POST_LOGIN)
    const history = useHistory()

    function clickLogin(event) {
        setShowLogin(true)
        setShowRegister(false)
    }

    function clickRegister(event) {
        setShowRegister(true)
        setShowLogin(false)
    }

    function handleOnChange(event) {
        let { name, value } = event.target
        let newForm = {
            ...registerForm,
            [name]: value,
        }
        console.log(newForm)
        setRegisterForm(newForm)
    }

    function handleLoginOnChange(event) {
        let { name, value } = event.target
        let newForm = {
            ...loginForm,
            [name]: value,
        }
        console.log(newForm)
        setLoginForm(newForm)
    }

    function buttonRegister(event) {
        event.preventDefault()
        register({
            variables: {
                name: registerForm.name,
                email: registerForm.email,
                password: registerForm.password,
            },
        })
            .then(({ data }) => {
                let input = JSON.parse(data.register)
                toast({
                    title: input.msg,
                    description: "We've created your account for you.",
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                })
            })
            .catch(console.log)
    }

    function buttonLogin(event) {
        event.preventDefault()
        console.log(loginForm, "<<<<<submit login")
        login({
            variables: {
                email: loginForm.email,
                password: loginForm.password,
            },
        })
            .then(({ data }) => {
                let input = JSON.parse(data.login)
                toast({
                    title: input.msg,
                    description: "We've created your account for you.",
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                })
                localStorage.setItem("access_token", input.access_token)
                history.push("/")
            })
            .catch(console.log)
    }

    return (
        <>
            <Nav clickLogin={clickLogin} clickRegister={clickRegister} />
            <Flex
                flexDirection="column"
                h="90vh"
                w="100%"
                style={{
                    backgroundImage: `url(${back})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                }}
            >
                <Box w="100%">
                    <Text fontSize="5xl" textAlign="center" fontWeight="bold">
                        BLAA
                    </Text>
                </Box>

                <Flex>
                    <Box w="70%"></Box>
                    <Flex align="center">
                        <Flex bg="green.50" align="flex-end"></Flex>
                        {showLogin ? (
                            <Login
                                buttonLogin={buttonLogin}
                                handleLoginOnChange={handleLoginOnChange}
                                loginForm={loginForm}
                            />
                        ) : null}
                        {showRegister ? (
                            <Register
                                buttonRegister={buttonRegister}
                                handleOnChange={handleOnChange}
                                registerForm={registerForm}
                            />
                        ) : null}
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
                width="full"
                maxWidth="500px"
                borderRadius={4}
                textAlign="center"
                boxShadow="lg"
                mr="5"
            >
                <Box p="4">
                    <Box>
                        <Heading as="h4" size="md">
                            Login To Your Account
                        </Heading>
                        <Box my={8} textAlign="left">
                            <form onSubmit={props.registerOnSubmit}>
                                <FormControl>
                                    <FormLabel>Email address</FormLabel>
                                    <Input
                                        name="email"
                                        value={props.loginForm.email}
                                        onChange={props.handleLoginOnChange}
                                        type="email"
                                        placeholder="Enter your email address"
                                    />
                                </FormControl>

                                <FormControl mt={4}>
                                    <FormLabel>Password</FormLabel>
                                    <Input
                                        name="password"
                                        value={props.loginForm.password}
                                        onChange={props.handleLoginOnChange}
                                        type="password"
                                        placeholder="Enter your password"
                                    />
                                </FormControl>

                                <Stack
                                    isInline
                                    justifyContent="space-between"
                                    mt={4}
                                >
                                    <Box>
                                        <Link color="teal.500">
                                            Forgot your password?
                                        </Link>
                                    </Box>
                                </Stack>

                                <Button
                                    onClick={props.buttonLogin}
                                    variantColor="teal"
                                    width="full"
                                    mt={4}
                                >
                                    Log In
                                </Button>
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
                width="full"
                maxWidth="500px"
                borderRadius={4}
                textAlign="center"
                boxShadow="lg"
                mr="5"
            >
                <Box p="4">
                    <Box>
                        <Heading as="h4" size="md">
                            Sign In To Your Account
                        </Heading>
                        <Box my={8} textAlign="left">
                            <form>
                                <FormControl>
                                    <FormLabel>Name</FormLabel>
                                    <Input
                                        name="name"
                                        value={props.registerForm.name}
                                        onChange={props.handleOnChange}
                                        type="text"
                                        placeholder="Enter your Name"
                                    />
                                </FormControl>

                                <FormControl>
                                    <FormLabel>Email address</FormLabel>
                                    <Input
                                        name="email"
                                        value={props.registerForm.email}
                                        onChange={props.handleOnChange}
                                        type="email"
                                        placeholder="Enter your email address"
                                    />
                                </FormControl>

                                <FormControl mt={4}>
                                    <FormLabel>Password</FormLabel>
                                    <Input
                                        name="password"
                                        value={props.registerForm.password}
                                        onChange={props.handleOnChange}
                                        type="password"
                                        placeholder="Enter your password"
                                    />
                                </FormControl>

                                <Stack
                                    isInline
                                    justifyContent="space-between"
                                    mt={4}
                                ></Stack>

                                <Button
                                    onClick={props.buttonRegister}
                                    variantColor="teal"
                                    width="full"
                                    mt={4}
                                >
                                    Sign In
                                </Button>
                            </form>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Flex>
    )
}

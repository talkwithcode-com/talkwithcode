import { useMutation } from "@apollo/client"
import {
    Button,
    Flex,
    FormControl,
    Input,
    FormLabel,
    Textarea,
    Text,
    FormHelperText,
    Heading,
    useToast,
} from "@chakra-ui/core"
import React, { useState } from "react"
import { GoCheck } from "react-icons/go"
import { useHistory, useParams } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import { POST_QUESTION } from "../graphql/index"
import jwtdecode from "jwt-decode"

export default function FormQuestion() {
    const {question_id} = useParams()
    const [form, setForm] = useState({
        title: "",
        timeLimit: "",
        score: "",
        description: "",
    })

    const [addQuestion] = useMutation(POST_QUESTION)
    const history = useHistory()
    const toast = useToast()

    function handleOnChange(event) {
        let { name, value } = event.target
        if (name === "timeLimit") {
            value = parseFloat(value)
        }
        let newForm = {
            ...form,
            [name]: value,
        }
        console.log(newForm)
        setForm(newForm)
    }

    function handleOnSubmit(event) {
        event.preventDefault()
        const dataUser = jwtdecode(localStorage.getItem("access_token"))
        console.log(dataUser, localStorage.getItem("access_token"))
        const input = {
            question_id ,
            timeLimit: form.timeLimit,
            title: form.title,
            score: form.score,
            description: form.description,
            user_id: dataUser._id,
            access_token: localStorage.getItem("access_token"),
        }
        addQuestion({
            variables: input,
        })
            .then((_) => {
                toast({
                    title: "Successfully insert a question",
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                })
                history.push("/questions")
            })
            .catch(console.log)
    }

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
                    justifyContent="center"
                >
                    <Heading color="white">Edit Your Question Here!</Heading>
                    <form onSubmit={(event) => handleOnSubmit(event)}>
                        <FormControl margin={4} pb={4} w="100%">
                            <FormLabel color="white">Question Title</FormLabel>
                            <Input
                                name="title"
                                value={form.title}
                                onChange={handleOnChange}
                                type="text"
                                placeholder="Put your title here"
                            />
                        </FormControl>
                        <FormControl margin={4} pb={4} w="100%">
                            <FormLabel color="white">Score</FormLabel>
                            <Input
                                name="score"
                                value={form.score}
                                onChange={handleOnChange}
                                type="text"
                                placeholder="Put your score here"
                            />
                            <FormHelperText>
                                <Text color="white.100">
                                    This will be used for calculate overall
                                    score
                                </Text>
                            </FormHelperText>
                        </FormControl>
                        <FormControl margin={4} pb={4} w="100%">
                            <FormLabel color="white">Time Limit</FormLabel>
                            <Input
                                name="timeLimit"
                                value={form.timeLimit}
                                onChange={handleOnChange}
                                type="text"
                                placeholder="Put your time limit here"
                            />
                            <FormHelperText>
                                <Text color="white.100">
                                    Please put time limit in minutes
                                </Text>
                            </FormHelperText>
                        </FormControl>
                        <FormControl margin={4} pb={4} w="100%">
                            <FormLabel color="white">Description</FormLabel>
                            <Textarea
                                name="description"
                                value={form.description}
                                onChange={handleOnChange}
                                placeholder="Put your description here"
                            />
                        </FormControl>
                        <Button
                            margin={4}
                            leftIcon={GoCheck}
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

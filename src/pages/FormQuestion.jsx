import { useMutation } from "@apollo/client"
import {
    Button,
    Flex,
    FormControl,
    FormHelperText,
    FormLabel,
    Heading,
    Input,
    Text,
    useToast,
} from "@chakra-ui/core"
import jwtdecode from "jwt-decode"
import React, { useState } from "react"
import { GoCheck } from "react-icons/go"
import { useHistory } from "react-router-dom"
import { Editor } from "../components"
import Sidebar from "../components/Sidebar"
import { POST_QUESTION } from "../graphql/index"

export default function FormQuestion() {
    const [form, setForm] = useState({
        title: "",
        timeLimit: "",
        score: "",
    })

    const [description, setDescription] = useState("")

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

        setForm(newForm)
    }

    function handleOnSubmit(event) {
        event.preventDefault()
        const dataUser = jwtdecode(localStorage.getItem("access_token"))
        console.log(dataUser, localStorage.getItem("access_token"))
        const input = {
            timeLimit: form.timeLimit,
            title: form.title,
            score: form.score,
            description: description,
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
                <Flex
                    flex="1"
                    bg="#56657F"
                    direction="column"
                    padding="2"
                    mr="3"
                >
                    <Sidebar />
                </Flex>
                <Flex flex="4" paddingY="8" paddingX="4">
                    <Flex flex="1" flexDirection="column" paddingX="2" w="80%">
                        <Heading mb="6">Add Your Question Here!</Heading>
                        <form onSubmit={(event) => handleOnSubmit(event)}>
                            <FormControl w="80%" mb="4">
                                <FormLabel mb="1">Question Title</FormLabel>
                                <Input
                                    name="title"
                                    value={form.title}
                                    onChange={handleOnChange}
                                    type="text"
                                    placeholder="Put your title here"
                                />
                            </FormControl>
                            <FormControl w="80%" mb="4">
                                <FormLabel mb="1">Score</FormLabel>
                                <Input
                                    name="score"
                                    value={form.score}
                                    onChange={handleOnChange}
                                    type="text"
                                    placeholder="Put your score here"
                                />
                                <FormHelperText>
                                    <Text>
                                        This will be used for calculate overall
                                        score
                                    </Text>
                                </FormHelperText>
                            </FormControl>
                            <FormControl w="80%" mb="4">
                                <FormLabel mb="1">Time Limit</FormLabel>
                                <Input
                                    name="timeLimit"
                                    value={form.timeLimit}
                                    onChange={handleOnChange}
                                    type="text"
                                    placeholder="Put your time limit here"
                                />
                                <FormHelperText>
                                    <Text>
                                        Please put time limit in minutes
                                    </Text>
                                </FormHelperText>
                            </FormControl>

                            <Button
                                mt="6"
                                leftIcon={GoCheck}
                                variantColor="green"
                                variant="solid"
                                type="submit"
                            >
                                <Text>Submit</Text>
                            </Button>
                        </form>
                    </Flex>
                    <Flex flex="2" boxShadow="xl">
                        <Editor
                            content="// Type your question detail here...."
                            updateValue={setDescription}
                        />
                    </Flex>
                </Flex>
            </Flex>
        </>
    )
}

import { useMutation } from "@apollo/client"
import {
    Button,
    Flex,
    FormControl,
    Input,
    FormLabel,
    Textarea,
    Checkbox,
    Text,
    FormHelperText,
    Heading,
    Select,
} from "@chakra-ui/core"
import React, { useState } from "react"
import { GoCheck } from "react-icons/go"
import { useHistory, useParams } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import { POST_SOLUTION } from "../graphql"

export default function FormSolution() {
    const [form, setForm] = useState({
        input: "",
        output: "",
    })
    const [addSolution] = useMutation(POST_SOLUTION)

    const { question_id } = useParams()

    const history = useHistory()

    function handleOnChange(event) {
        let { name, value } = event.target
        if (name === "score") {
            value = Number(value)
        } else if (name === "timeLimit") {
            value = Number(value)
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
        addSolution({
            variables: {
                input: form.input,
                output: form.output,
                question_id: question_id,
                access_token: localStorage.getItem("access_token"),
            },
        })
            .then((_) => {
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
                    <Heading color="white">
                        Add Solution to {question_id}
                    </Heading>
                    <form onSubmit={(event) => handleOnSubmit(event)}>
                        <FormControl margin={4} pb={4} w="100%">
                            <FormLabel color="white">
                                Input for Solution
                            </FormLabel>
                            <Textarea
                                name="input"
                                value={form.input}
                                onChange={handleOnChange}
                                type="text"
                                placeholder="Put your input solution here"
                            />
                        </FormControl>
                        <FormControl margin={4} pb={4} w="100%">
                            <FormLabel color="white">Expected Output</FormLabel>
                            <Textarea
                                name="output"
                                value={form.output}
                                onChange={handleOnChange}
                                type="text"
                                placeholder="Put your expected output here"
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

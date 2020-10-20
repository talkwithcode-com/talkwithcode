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
} from "@chakra-ui/core"
import React, { useState } from "react"
import { GoCheck } from "react-icons/go"
import { useHistory } from "react-router-dom"
import Sidebar from "../components/Sidebar"

export default function FormQuestion() {
    const [form, setForm] = useState({
        title: "",
        timeLimit: 0,
        score: 0,
        description: "",
    })

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
        console.log("here")
        history.push("/questions")
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
                    <Heading color="white">Add Your Question Here!</Heading>
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
                                type="number"
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
                                type="number"
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

import {
    Box,
    Button,
    Flex,
    FormControl,
    Input,
    FormLabel,
    Text,
    Heading,
    Select,
} from "@chakra-ui/core"
import { MdDelete } from "react-icons/md"
import React, { useState } from "react"
import { GoCheck } from "react-icons/go"
import { useHistory } from "react-router-dom"
import Sidebar from "../components/Sidebar"

export default function FormRoom() {
    // const { data, loading, error, refetch } = useQuery(GET_QUESTIONS, {
    //     variables: {
    //         access_token: localStorage.getItem("access_token"),
    //     },
    // })

    const [form, setForm] = useState({
        title: "",
        time_start: "",
        time_end: "",
        ids: [],
    })

    const [questions, setQuestions] = useState([
        {
            _id: "title id 1",
            title: "title 1",
            description: "description 1",
            score: 10,
            timeLimit: 40,
        },
        {
            _id: "title id 2",
            title: "walaole",
            description: "description 2",
            score: 10,
            timeLimit: 40,
        },
        {
            _id: "title id 3",
            title: "title 3",
            description: "description 3",
            score: 10,
            timeLimit: 40,
        },
    ])

    const [selections, setSelections] = useState([
        {
            _id: "title id 1",
            title: "title 1",
            description: "description 1",
            score: 10,
            timeLimit: 40,
        },
        {
            _id: "title id 2",
            title: "walaole",
            description: "description 2",
            score: 10,
            timeLimit: 40,
        },
        {
            _id: "title id 3",
            title: "title 3",
            description: "description 3",
            score: 10,
            timeLimit: 40,
        },
    ])

    const history = useHistory()

    function handleOnChange(event) {
        let { name, value } = event.target
        if (name === "ids") {
            let arrInput = questions.filter(
                (question) => question._id === value
            )
            let newForm = {
                ...form,
                [name]: form.ids.concat(arrInput),
            }
            setForm(newForm)
            let newSelections = [...selections]
            newSelections.splice(
                newSelections.findIndex(
                    (selection) => selection._id === arrInput[0]._id
                ),
                1
            )
            setSelections(newSelections)
        } else {
            let newForm = {
                ...form,
                [name]: value,
            }
            setForm(newForm)
        }
    }

    function handleOnClick(input) {
        let newSetQuestion = form.ids
        let newSelections = selections.concat(
            newSetQuestion.find((item) => item.title === input)
        )
        newSetQuestion.splice(
            newSetQuestion.findIndex((item) => item.title === input),
            1
        )
        let newForm = {
            ...form,
            ids: newSetQuestion,
        }
        setForm(newForm)
        setSelections(newSelections)
    }

    function handleOnSubmit(event) {
        event.preventDefault()
        console.log("here")
        history.push("/rooms-list")
    }

    return (
        <>
            <Flex flex="1" w="100%" h="100vh">
                <Flex flex="1" bg="#56657F" direction="column" padding="2">
                    <Sidebar />
                </Flex>
                <Flex
                    flex="4"
                    direction="column"
                    bg="gray.800"
                    alignItems="center"
                    justify="center"
                >
                    <Heading color="white">Add Your Room Here!</Heading>
                    <Flex
                        direction="column"
                        onSubmit={(event) => handleOnSubmit(event)}
                        as="form"
                        w="60%"
                        align="center"
                    >
                        <FormControl margin={4} pb={4} w="100%">
                            <FormLabel color="white">Room Title</FormLabel>
                            <Input
                                name="title"
                                value={form.title}
                                onChange={handleOnChange}
                                type="text"
                                placeholder="Put your title here"
                            />
                        </FormControl>
                        <FormControl margin={4} pb={4} w="100%">
                            <FormLabel color="white">Time Start</FormLabel>
                            <Input
                                name="time_start"
                                value={form.time_start}
                                onChange={handleOnChange}
                                type="datetime-local"
                            />
                        </FormControl>
                        <FormControl margin={4} pb={4} w="100%">
                            <FormLabel color="white">Time End</FormLabel>
                            <Input
                                name="time_end"
                                value={form.time_end}
                                onChange={handleOnChange}
                                type="datetime-local"
                            />
                        </FormControl>
                        <FormControl margin={4} pb={4} w="100%">
                            <FormLabel color="white">Question List</FormLabel>
                            <Select
                                name="ids"
                                placeholder="Select option"
                                value={form.ids}
                                onChange={handleOnChange}
                            >
                                {selections.map((selection) => {
                                    return (
                                        <option
                                            key={selection._id}
                                            value={selection._id}
                                        >
                                            {selection.title}
                                        </option>
                                    )
                                })}
                            </Select>
                        </FormControl>
                        <FormControl margin={4} pb={4} w="100%">
                            <FormLabel color="white">
                                Selected Question
                            </FormLabel>
                            <Box bg="white" minH="4vh" w="100%">
                                {form.ids.map((id) => {
                                    return (
                                        <Button
                                            key={id._id}
                                            rightIcon={MdDelete}
                                            onClick={(event) =>
                                                handleOnClick(id.title)
                                            }
                                        >
                                            {id.title}
                                        </Button>
                                    )
                                })}
                            </Box>
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
                    </Flex>
                </Flex>
            </Flex>
        </>
    )
}

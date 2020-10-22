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
    useDisclosure,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from "@chakra-ui/core"
import { MdDelete } from "react-icons/md"
import React, { useEffect, useState } from "react"
import { GoCheck } from "react-icons/go"
import { useHistory } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import { useMutation, useQuery } from "@apollo/client"
import jwtdecode from "jwt-decode"
import { GET_QUESTIONS, POST_ROOM } from "../graphql/index"

export default function FormRoom() {
    const { data, loading, error, refetch } = useQuery(GET_QUESTIONS, {
        variables: {
            access_token: localStorage.getItem("access_token"),
        },
    })

    const [respond, setRespond] = useState("")

    const [addChannelToken] = useMutation(POST_ROOM)
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [form, setForm] = useState({
        title: "",
        time_start: "",
        time_end: "",
        ids: [],
    })

    const [questions, setQuestions] = useState([])

    const history = useHistory()

    function handleOnChange(event) {
        let { name, value } = event.target
        if (name === "ids") {
            let arrInput = questions.questions.filter(
                (question) => question._id === value
            )
            let newForm = {
                ...form,
                [name]: form.ids.concat(arrInput),
            }
            setForm(newForm)
            const newQuestions = questions.questions.filter(
                (question) => question._id !== value
            )
            setQuestions({ questions: newQuestions })
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
        let newQuestion = questions.questions.concat(
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
        setQuestions({ questions: newQuestion })
    }

    function handleOnSubmit(event) {
        event.preventDefault()
        const dataUser = jwtdecode(localStorage.getItem("access_token"))
        console.log(dataUser)
        const dataIds = form.ids.map((id) => {
            return id._id
        })
        const input = {
            time_start: form.time_start.toString(),
            time_end: form.time_end.toString(),
            user_id: dataUser._id,
            ids: dataIds.join(),
        }
        console.log(input)
        addChannelToken({
            variables: input,
        })
            .then(({ data }) => {
                console.log(data)
                setRespond(data.addChannelToken)
                onOpen()
                // history.push("/questions")
            })
            .catch(console.log)
    }

    useEffect(() => {
        setQuestions(data)
    }, [loading, data])
    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={() => {
                    onClose()
                    history.push("/questions")
                }}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Channel Token</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text>
                            Below are your channel token. Please copy it,
                            because it will required for entering the room
                        </Text>
                        <Text>{respond}</Text>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            variantColor="blue"
                            mr={3}
                            onClick={() => {
                                onClose()
                                history.push("/questions")
                            }}
                        >
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

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
                                {questions?.questions?.map((question) => {
                                    return (
                                        <option
                                            key={question._id}
                                            value={question._id}
                                        >
                                            {question.title}
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

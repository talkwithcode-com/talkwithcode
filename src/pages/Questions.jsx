import { useMutation, useQuery } from "@apollo/client"
import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    IconButton,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Radio,
    RadioGroup,
    Skeleton,
    Text,
    Textarea,
    useDisclosure,
    useToast,
} from "@chakra-ui/core"
import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import { GoCheck } from "react-icons/go"
import Sidebar from "../components/Sidebar"
import * as table from "../components/table"
import {
    DELETE_QUESTION,
    GET_QUESTIONS,
    POST_SAMPLE_SOLUTION,
    POST_SOLUTION,
} from "../graphql/index"
import { getToken } from "../helpers/auth"

export default function Questions() {
    const [deleteQuestion] = useMutation(DELETE_QUESTION)
    const { data, loading } = useQuery(GET_QUESTIONS, {
        variables: {
            access_token: localStorage.getItem("access_token"),
        },
    })

    const [questions, setQuestions] = React.useState([])
    const [selectedId, setSelectedId] = useState(null)
    const [title, setTitle] = useState("")
    const toast = useToast()
    const history = useHistory()
    const { isOpen, onOpen, onClose } = useDisclosure()

    React.useEffect(() => {
        if (data) {
            setQuestions(data.questions)
        }
    }, [data])

    const onDelete = (id) => {
        const deleted = questions.filter((e) => e._id !== id)
        setQuestions(deleted)
        deleteQuestion({
            variables: {
                question_id: id,
                access_token: getToken(),
            },
        })
            .then((data) => {
                console.log(data)
            })
            .catch((err) => {
                const message =
                    err.message ||
                    "Failed while deleting question. Question already restored."
                setQuestions(questions)
                toast({
                    title: message,

                    status: "error",
                    duration: 2000,
                    isClosable: true,
                })
            })
    }

    const handleAddSolution = (id, title) => {
        onOpen()
        setSelectedId(id)
        setTitle(title)
    }

    return (
        <Flex>
            <Flex
                flex="1"
                direction="column"
                bg="gray.700"
                h="100vh"
                px="2"
                py="6"
            >
                <Sidebar />
            </Flex>
            <Flex flex="4" direction="column">
                <Flex
                    w="80%"
                    mx="auto"
                    mt="8"
                    justifyContent="space-between"
                    alignContent="center"
                >
                    <AddSolution
                        isOpen={isOpen}
                        question_id={selectedId}
                        onClose={onClose}
                        title={title}
                    />
                    <Heading>List of Questions</Heading>
                    <Button
                        leftIcon="small-add"
                        size="sm"
                        variant="outline"
                        variantColor="blue"
                        onClick={() => history.push("/add-question")}
                    >
                        {" "}
                        Create Question
                    </Button>
                </Flex>
                {loading ? (
                    <Flex w="80%" mx="auto" mt="8" direction="column">
                        <Skeleton height="40px" my="10px" mb="20px" />
                        <Skeleton height="20px" my="10px" />
                        <Skeleton height="20px" my="10px" />
                        <Skeleton height="20px" my="10px" />
                    </Flex>
                ) : (
                    <table.Table w="80%" mx="auto" mt="8">
                        <table.Thead>
                            <table.Tr
                                borderBottom="2px"
                                borderTop="2px"
                                py="1"
                                mb="2"
                            >
                                <table.Th justifyContent="flex-start">
                                    Title
                                </table.Th>
                                <table.Th>Score</table.Th>
                                <table.Th>Action</table.Th>
                            </table.Tr>
                        </table.Thead>

                        <table.TBody>
                            {questions?.map((e) => {
                                return (
                                    <table.Tr key={e._id}>
                                        <table.Td
                                            cursor="pointer"
                                            justifyContent="flex-start"
                                            textTransform="capitalize"
                                        >
                                            {e.title}
                                        </table.Td>
                                        <table.Td>{e.score}</table.Td>
                                        <table.Td>
                                            <IconButton
                                                mr="2"
                                                aria-label="add solution"
                                                icon="attachment"
                                                onClick={() =>
                                                    handleAddSolution(
                                                        e._id,
                                                        e.title
                                                    )
                                                }
                                            />
                                            <IconButton
                                                mr="2"
                                                aria-label="update"
                                                icon="edit"
                                                onClick={() =>
                                                    history.push(
                                                        "/questions/" + e._id
                                                    )
                                                }
                                            />
                                            <IconButton
                                                mr="2"
                                                onClick={() => onDelete(e._id)}
                                                aria-label="delete"
                                                icon="delete"
                                            />
                                        </table.Td>
                                    </table.Tr>
                                )
                            })}
                        </table.TBody>
                    </table.Table>
                )}
            </Flex>
        </Flex>
    )
}

function AddSolution({ isOpen, question_id, onClose, title }) {
    const [addSolution] = useMutation(POST_SOLUTION)
    const [addSampleSolution] = useMutation(POST_SAMPLE_SOLUTION)
    const toast = useToast()
    const [loading, setLoading] = useState(false)
    const [caseType, setCaseType] = useState("test")
    const [form, setForm] = React.useState({
        input: "",
        output: "",
    })
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
        setForm(newForm)
    }

    const handleOnSubmit = () => {
        setLoading(true)
        if (caseType === "test") {
            addSolution({
                variables: {
                    input: form.input,
                    output: form.output,
                    question_id: question_id,
                    access_token: getToken(),
                },
            })
                .then((_) => {
                    onClose()
                    toast({
                        title: "Success Added Test Solution",
                        status: "success",
                        duration: 2000,
                        isClosable: true,
                    })
                })
                .catch(console.log)
                .finally(() => {
                    setLoading(false)
                    setForm({ input: "", output: "" })
                })
        } else {
            addSampleSolution({
                variables: {
                    input: form.input,
                    output: form.output,
                    question_id: question_id,
                    access_token: getToken(),
                },
            })
                .then((_) => {
                    onClose()
                    toast({
                        title: "Success Added Samble Solution",
                        status: "success",
                        duration: 2000,
                        isClosable: true,
                    })
                })
                .catch(console.log)
                .finally(() => {
                    setLoading(false)
                    setForm({ input: "", output: "" })
                })
        }
    }

    const handleCase = (e) => {
        setCaseType(e.target.value)
    }
    return (
        <Modal blockScrollOnMount={true} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Create Solution</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Heading fontSize="md" mb="3">
                        {title}
                    </Heading>
                    <FormControl pb={4} w="100%">
                        <FormLabel fontSize="sm">Input for Solution</FormLabel>
                        <Textarea
                            name="input"
                            value={form.input}
                            onChange={handleOnChange}
                            type="text"
                            placeholder="Put your input solution here"
                        />
                    </FormControl>
                    <FormControl w="100%">
                        <FormLabel fontSize="sm">Expected Output</FormLabel>
                        <Textarea
                            name="output"
                            value={form.output}
                            onChange={handleOnChange}
                            type="text"
                            placeholder="Put your expected output here"
                        />
                    </FormControl>
                    <RadioGroup
                        my="4"
                        defaultValue={caseType}
                        spacing={5}
                        onChange={handleCase}
                        isInline
                    >
                        <Radio variantColor="red" value="sample">
                            Sample Case
                        </Radio>
                        <Radio variantColor="green" value="test">
                            Test Cases
                        </Radio>
                    </RadioGroup>
                </ModalBody>

                <ModalFooter>
                    <Button
                        variant="ghost"
                        variantColor="red"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        ml={3}
                        leftIcon={GoCheck}
                        variantColor="green"
                        variant="solid"
                        type="submit"
                        isLoading={loading}
                        loadingText="Submitting"
                        onClick={handleOnSubmit}
                    >
                        <Text>Submit</Text>
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

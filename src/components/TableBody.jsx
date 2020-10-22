import { useMutation } from "@apollo/client"
import {
    Box,
    Button,
    Flex,
    List,
    ListItem,
    Text,
    useToast,
} from "@chakra-ui/core"
import React from "react"
import { useHistory } from "react-router-dom"
import { DELETE_QUESTION } from "../graphql/index"

export default function TableBody(props) {
    const history = useHistory()
    const [deleteQuestion] = useMutation(DELETE_QUESTION)
    const toast = useToast()

    function updateOnClick(question_id) {
        // event.preventDefault()
        console.log(question_id)
        history.push(`/questions/${question_id}`)
    }

    function deleteOnClick(param) {
        // event.preventDefault()
        deleteQuestion({
            variables: {
                question_id: param,
                access_token: localStorage.getItem("access_token"),
            },
        }).then(({ data }) => {
            toast({
                title: data.deleteQuestion,
                status: "success",
                duration: 2000,
                isClosable: true,
            })
        })
    }

    function solutionOnClick(event) {
        event.preventDefault()
        console.log(props.question._id)
        history.push("/add-solution/" + props.question._id)
    }

    function sampleOnClick(event) {
        event.preventDefault()
        console.log(props.question._id)
        history.push("/add-sample/" + props.question._id)
    }
    return (
        <Flex
            width="60%"
            borderWidth="1px"
            rounded="lg"
            overflow="hidden"
            alignItems="center"
            p="4"
            m="2"
        >
            {props.question && (
                <>
                    <Flex flex="4" direction="column">
                        <Box
                            color="gray.200"
                            fontWeight="bold"
                            letterSpacing="wide"
                            textTransform="uppercase"
                            ml="2"
                        >
                            <Text>{props.question.title}</Text>
                        </Box>
                        <Box color="gray.500" fontWeight="semibold" ml="2">
                            <Text>{props.question.description}</Text>
                        </Box>
                        <Box color="gray.500" fontWeight="semibold" ml="2">
                            <Text>Max Score: {props.question.score}</Text>
                        </Box>
                        <Box color="gray.500" fontWeight="semibold" ml="2">
                            <Text>
                                Time Limit: {props.question.timeLimit} minutes
                            </Text>
                        </Box>
                    </Flex>
                    <Flex
                        flex="1"
                        direction="column"
                        alignItems="end"
                        justify="end"
                    >
                        <Flex>
                            <Flex
                                flex="1"
                                direction="column"
                                align="center"
                                mr="1"
                            >
                                <Button
                                    color="gray.800"
                                    leftIcon="edit"
                                    variantColor="green"
                                    m="2"
                                    width="100%"
                                    onClick={solutionOnClick}
                                >
                                    Add Solution
                                </Button>
                                <Button
                                    color="gray.800"
                                    leftIcon="edit"
                                    variantColor="teal"
                                    m="2"
                                    width="100%"
                                    onClick={sampleOnClick}
                                >
                                    Add Sample
                                </Button>
                            </Flex>
                            <Flex flex="1" direction="column" align="start">
                                <Button
                                    color="gray.800"
                                    leftIcon="edit"
                                    variantColor="yellow"
                                    m="2"
                                    width="80%"
                                    onClick={() =>
                                        updateOnClick(props.question._id)
                                    }
                                >
                                    Update
                                </Button>

                                <Button
                                    color="gray.800"
                                    leftIcon="delete"
                                    variantColor="red"
                                    m="2"
                                    width="80%"
                                    onClick={() =>
                                        deleteOnClick(props.question._id)
                                    }
                                >
                                    Delete
                                </Button>
                            </Flex>
                        </Flex>
                    </Flex>
                </>
            )}
            {props.room && (
                <React.Fragment>
                    <Flex flex="4" direction="column">
                        <Box
                            color="gray.200"
                            fontWeight="bold"
                            letterSpacing="wide"
                            textTransform="uppercase"
                            ml="2"
                        >
                            <Text>Room {props.room.title} Details</Text>
                        </Box>
                        <Box color="gray.500" fontWeight="semibold" ml="2">
                            <Text>Started at: {props.room.time_start}</Text>
                        </Box>
                        <Box color="gray.500" fontWeight="semibold" ml="2">
                            <Text>Finish at: {props.room.time_end}</Text>
                        </Box>
                        <Box color="gray.500" fontWeight="semibold" ml="2">
                            <List as="ol" styleType="decimal">
                                <Text>Question Sets:</Text>
                                {props.room.ids.map((question) => {
                                    return (
                                        <ListItem
                                            key={question.id}
                                            color="gray.600"
                                        >
                                            {question.title}
                                        </ListItem>
                                    )
                                })}
                            </List>
                        </Box>
                    </Flex>
                    <Flex flex="1" direction="column" align="end">
                        <Button
                            color="gray.800"
                            leftIcon="delete"
                            variantColor="red"
                            m="2"
                            width="70%"
                            onClick={deleteOnClick}
                        >
                            Delete
                        </Button>
                    </Flex>
                </React.Fragment>
            )}
        </Flex>
    )
}

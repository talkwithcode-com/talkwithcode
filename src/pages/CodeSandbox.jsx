import { useMutation, useQuery } from "@apollo/client"
import {
    Button,
    Collapse,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    Flex,
    Heading,
    IconButton,
    List,
    ListIcon,
    ListItem,
    Skeleton,
    Spinner,
    useColorMode,
    useDisclosure,
} from "@chakra-ui/core"
import React, { useContext, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Editor, MdView } from "../components"
import {
    GET_QUESTION_BY_ID,
    RUN_CODE,
    SHARE_SCREEN,
    VALIDATE_ROOM_CODE,
} from "../graphql/codeSanbox"
import { getToken } from "../helpers/auth"
import parser from "../lib/exampleUnified"
import { LanguageContext } from "../providers/LanguageProvider"

const CodeSandbox = () => {
    const { colorMode } = useColorMode()
    const { value: lang } = useContext(LanguageContext)
    const [runCodeMutation] = useMutation(RUN_CODE)
    const [logs, setLogs] = useState([])
    const [logsLoading, setLogsLoading] = useState(false)
    const [show, setShow] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()

    const { id } = useParams()

    const { loading, data, refetch } = useQuery(GET_QUESTION_BY_ID, {
        variables: {
            access_token: getToken(),
            id: id,
        },
    })

    const [shareScreen] = useMutation(SHARE_SCREEN)

    useEffect(() => {
        refetch()
    }, [id, refetch])

    const handleRunCode = (code) => {
        setLogsLoading(true)
        runCodeMutation({
            variables: {
                access_token: getToken(),
                data: {
                    question_id: data.question._id,
                    source_code: code,
                    lang: lang,
                },
            },
        })
            .then(({ data }) => {
                const {
                    runCode: { logs },
                } = data
                setLogs(logs)
                setShow(true)
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => setLogsLoading(false))
    }

    return (
        <Flex className="code-sandbox" h="100vh" flex="1">
            <Flex
                className="question-list"
                flex="1"
                p="2"
                direction="column"
                mxaW="50%"
            >
                <Editor
                    hideFooter={false}
                    onRun={handleRunCode}
                    show={show}
                    toggleShow={() => setShow((p) => !p)}
                    updateValue={(content) => {
                        console.log(content)
                        shareScreen({
                            variables: {
                                user: "Jose",
                                content,
                            },
                        })
                    }}
                />
                {logsLoading ? (
                    <Flex
                        align="center"
                        justify="center"
                        bg={colorMode === "light" ? "gray.100" : "gray.800"}
                    >
                        <Collapse mt={4} px="4" isOpen={logsLoading}>
                            <Spinner
                                thickness="4px"
                                speed="0.65s"
                                emptyColor="gray.200"
                                color="blue.500"
                                size="xl"
                                about="Loading..."
                            />
                        </Collapse>
                    </Flex>
                ) : (
                    <Flex
                        hidden={!show}
                        flexWrap="wrap"
                        justify="flex-start"
                        paddingX="2"
                        paddingY="4"
                        position="relative"
                        bg={colorMode === "light" ? "gray.100" : "gray.800"}
                    >
                        {logs?.map((e, i) => {
                            const success = e.status === "success"
                            return (
                                <Flex m="2">
                                    <Button
                                        key={e._id}
                                        size="sm"
                                        leftIcon={success ? "check" : "close"}
                                        variantColor={success ? "green" : "red"}
                                        fontSize="sm"
                                    >
                                        Test Case #{i + 1}
                                    </Button>
                                </Flex>
                            )
                        })}
                        <IconButton
                            onClick={() => setShow(false)}
                            size="sm"
                            icon="arrow-down"
                            variant="outline"
                            variantColor="blue"
                            position="absolute"
                            right="10px"
                            bottom="10px"
                        />
                    </Flex>
                )}
            </Flex>
            <Flex
                className="text-editor"
                flex="1"
                p="2"
                px="4"
                direction="column"
            >
                {loading ? (
                    <Placeholder />
                ) : (
                    <React.Fragment>
                        <QuestionDrawer isOpen={isOpen} onClose={onClose} />
                        <Flex justify="space-between" mb="6">
                            <Heading>{data?.question?.title}</Heading>
                            <IconButton icon="chevron-left" onClick={onOpen} />
                        </Flex>
                        <MdView
                            __html={parser(data?.question?.description).__html}
                        />
                    </React.Fragment>
                )}
            </Flex>
        </Flex>
    )
}
const Placeholder = () => (
    <div>
        <Skeleton height="40px" my="10px" mb="20px" />
        <Skeleton height="20px" my="10px" />
        <Skeleton height="20px" my="10px" />
        <Skeleton height="20px" my="10px" />

        <Skeleton height="20px" my="10px" mt="40px" />
        <Skeleton height="20px" my="10px" />
    </div>
)

const QuestionDrawer = ({ onClose, isOpen }) => {
    const roomCode = localStorage.getItem("roomcode")
    const [validateCode] = useMutation(VALIDATE_ROOM_CODE)
    const [questions, setQuestions] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        validateCode({
            variables: {
                key: roomCode,
                access_token: getToken(),
            },
        })
            .then(({ data: { validateChannelToken } }) => {
                const res = validateChannelToken.questions.map((item) => {
                    const body = JSON.parse(item)
                    return body.questions.pop()
                })
                setQuestions(res)
            })
            .catch(console.error)
            .finally(() => {
                setLoading(false)
            })
    }, [roomCode, validateCode])

    return (
        <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerHeader borderBottomWidth="1px">
                    List Questions
                </DrawerHeader>
                <DrawerBody>
                    {loading ? (
                        <Placeholder />
                    ) : (
                        <List spacing={3}>
                            {questions.map((e, index) => {
                                return (
                                    <ListItem
                                        key={index}
                                        cursor="pointer"
                                        onClick={() => console.log(index)}
                                    >
                                        <Link to={`/sandbox/${e._id}`}>
                                            <ListIcon
                                                icon="check-circle"
                                                color="green.500"
                                            />
                                            {e.title}
                                        </Link>
                                    </ListItem>
                                )
                            })}
                        </List>
                    )}
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    )
}

export default CodeSandbox

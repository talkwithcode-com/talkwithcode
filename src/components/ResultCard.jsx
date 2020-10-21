import React, { useState } from "react"
import { useMutation } from "@apollo/client"
import { Box, Button, Flex, IconButton, Spinner } from "@chakra-ui/core"

import { RUN_CODE } from "../graphql/codeSanbox"
import { getToken } from "../helpers/auth"

function ResultCard({ data }) {
    const [runCode] = useMutation(RUN_CODE)
    const [loading, setLoading] = useState(false)
    const [outputs, setOutputs] = useState([])
    const [show, setShow] = useState(false)

    const handleRun = () => {
        setLoading(true)
        setShow(true)

        runCode({
            variables: {
                access_token: getToken(),
                data: {
                    question_id: data.question_id,
                    source_code: data.code,
                    lang: data.lang,
                },
            },
        })
            .then(
                ({
                    data: {
                        runCode: { logs },
                    },
                }) => {
                    setOutputs(logs)
                }
            )
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    let height = { h: "50px" }

    if (show) {
        height = { flex: 1 }
    }

    return (
        <Flex {...height} px="4" flexDirection="column">
            <Flex
                h="50px"
                align="center"
                justifyContent="flex-end"
                w="100%"
                border="3px"
            >
                <Flex flex="1" mr="auto" align="center">
                    <Spinner
                        hidden={!loading}
                        thickness="2px"
                        speed="0.65s"
                        emptyColor="gray.200"
                        color="blue.500"
                        size="md"
                    />

                    <IconButton
                        hidden={loading}
                        variantColor="blue"
                        aria-label="close"
                        icon={show ? "arrow-down" : "arrow-up"}
                        onClick={() => {
                            setShow((p) => !p)
                        }}
                        size="sm"
                    />
                </Flex>
                <Flex>
                    <Button
                        mr="4"
                        variant="outline"
                        variantColor="green"
                        size="sm"
                        onClick={handleRun}
                    >
                        Run
                    </Button>
                    <Button variant="solid" variantColor="green" size="sm">
                        Submit
                    </Button>
                </Flex>
            </Flex>

            {outputs?.length > 0 && !loading && show && (
                <Flex flex="1" flexWrap="wrap" padding="2">
                    {outputs.map((e, i) => {
                        const success = e.status === "success"

                        return (
                            <Button
                                key={i}
                                size="sm"
                                leftIcon={success ? "check" : "close"}
                                variantColor={success ? "green" : "red"}
                                fontSize="sm"
                                mr="2"
                            >
                                Test Case #{i + 1}
                            </Button>
                        )
                    })}
                </Flex>
            )}
        </Flex>
    )
}

export default React.memo(ResultCard)

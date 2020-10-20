import React, { useState } from "react"
import { Box, Button, Flex, IconButton, Spinner } from "@chakra-ui/core"

import * as codex from "../service/codex"

function ResultCard({ data }) {
    const [loading, setLoading] = useState(false)
    const [outputs, setOutputs] = useState([])
    const [show, setShow] = useState(false)

    const handleRun = () => {
        setLoading(true)
        setShow(true)
        codex
            .runCode(data.code, data.lang)
            .then((e) => e.data)
            .then((data) => {
                setLoading(false)
                setOutputs(data.outputs)
            })
            .catch(console.log)
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
                <Flex flex="1">
                    {outputs.map((e, i) => {
                        return (
                            <Box
                                style={{ whiteSpace: "pre-line" }}
                                key={i}
                                fontSize="sm"
                            >
                                {e.stdout}
                            </Box>
                        )
                    })}
                </Flex>
            )}
        </Flex>
    )
}

export default React.memo(ResultCard)

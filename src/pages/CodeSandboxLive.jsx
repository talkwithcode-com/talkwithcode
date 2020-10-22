import { useSubscription } from "@apollo/client"
import { Flex } from "@chakra-ui/core"
import React, { useState } from "react"
import { Editor } from "../components"
import { LISTEN_SCREEN } from "../graphql/codeSanbox"

const CodeSandboxLive = () => {
    const [show, setShow] = useState(false)

    const { data: subscribeData, loading: loadingSubs } = useSubscription(
        LISTEN_SCREEN
    )

    if (loadingSubs) return null

    const {
        code: { content },
    } = subscribeData

    return (
        <Flex className="code-sandbox" h="100vh" flex="1">
            <Flex
                className="question-list"
                flex="1"
                p="2"
                direction="column"
                mxaW="100%"
            >
                <Editor
                    content={content}
                    show={show}
                    hideFooter={true}
                    toggleShow={() => setShow((p) => !p)}
                />
            </Flex>
        </Flex>
    )
}

export default CodeSandboxLive

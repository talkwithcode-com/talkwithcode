import React from "react"
import styled from "@emotion/styled"
import { Box, Flex, useColorMode } from "@chakra-ui/core"
import MdViewThemeProvider from "./MdViewThemeProvider"

const MdView = ({ __html }) => {
    const { colorMode } = useColorMode()

    return (
        <Flex
            as={SlideFromLeft}
            flex={1}
            flexDirection="column"
            borderLeft="0"
            overflowY="auto"
            position="relative"
            borderColor={colorMode === "dark" ? "gray.700" : "gray.200"}
        >
            <MdViewThemeProvider colorMode={colorMode}>
                <Box
                    wordBreak="break-word"
                    width="100%"
                    dangerouslySetInnerHTML={{ __html: __html }}
                />
            </MdViewThemeProvider>
        </Flex>
    )
}

const SlideFromLeft = styled.div`
    @keyframes slideInFromLeft {
        0% {
            transform: translateX(-50%);
            flex: 0;
        }
        100% {
            transform: translateX(0);
            flex: 1;
        }
    }

    animation: 0.7s ease 0s slideInFromLeft;
    &::-webkit-scrollbar {
        display: none; // hide scroll-bar
    }
`

export default MdView

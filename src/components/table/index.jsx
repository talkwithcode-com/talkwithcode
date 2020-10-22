import React from "react"
import { Box } from "@chakra-ui/core"

export const Tr = ({ children, ...rest }) => {
    return (
        <Box
            as="tr"
            w="100%"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            {...rest}
        >
            {children}
        </Box>
    )
}

export const Th = ({ children, ...rest }) => {
    return (
        <Box
            as="th"
            display="flex"
            justifyContent="center"
            flex="1"
            p="2"
            {...rest}
        >
            {children}
        </Box>
    )
}

export const Td = ({ children, ...rest }) => {
    return (
        <Box
            as="td"
            display="flex"
            justifyContent="center"
            alignItems="center"
            p="3px"
            flex="1"
            {...rest}
        >
            {children}
        </Box>
    )
}

export const Table = ({ children, ...rest }) => {
    return (
        <Box
            as="table"
            w="100%"
            style={{ borderCollapse: "collapse" }}
            {...rest}
        >
            {children}
        </Box>
    )
}

export const Thead = ({ children, ...rest }) => {
    return (
        <Box as="thead" {...rest}>
            {children}
        </Box>
    )
}

export const TBody = ({ children, ...rest }) => {
    return (
        <Box as="tbody" {...rest}>
            {children}
        </Box>
    )
}

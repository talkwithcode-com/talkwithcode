import { gql } from "@apollo/client"

export const RUN_CODE = gql`
    mutation RunCode($access_token: String!, $data: RunCodeInput!) {
        runCode(access_token: $access_token, data: $data) {
            logs {
                stdout
                status
            }
        }
    }
`

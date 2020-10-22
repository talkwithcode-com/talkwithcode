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

export const GET_QUESTION = gql`
    query GetQuestion($access_token: String) {
        questions(access_token: $access_token) {
            _id
            title
            description
            title
        }
    }
`

export const GET_QUESTION_BY_ID = gql`
    query GetQuestionById($access_token: String, $id: String) {
        question(access_token: $access_token, _id: $id) {
            _id
            title
            description
            sample_solution {
                input
                output
                _id
            }
        }
    }
`

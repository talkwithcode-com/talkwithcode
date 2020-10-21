import { gql } from "@apollo/client"

export const POST_REGISTER = gql`
    mutation Register($name: String!, $email: String!, $password: String!) {
        register(name: $name, email: $email, password: $password)
    }
`

export const POST_LOGIN = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password)
    }
`


export const GET_QUESTIONS = gql`
    query Questions($access_token: String) {
        questions(access_token: $access_token) {
            id
            title
            score
            description
            user_id
            sample_solution {
                _id
                input
                output
            }
            solution {
                _id
                input
                output
            }
        }
    }
`

// export const GET_QUESTIONS_BY_ID = gql`
//     query Question(
//         $question_id: question_id
//         $access_token: access_token
//     ){
//         question(
//             _id: $question_id
//             access_token: $access_token
//         ) {
//             id
//             title
//             score
//             description
//             user_id
//             sample_solution: {
//                 _id
//                 input
//                 output
//             }
//             solution: {
//                 _id
//                 input
//                 output
//             }
//         }
//     }
// `

// export const POST_QUESTION = gql`
//     mutation AddQuestion(
//         $timeLimit: timeLimit
//         $title: title
//         $score: score
//         $description: description
//         $user_id: user_id
//         $access_token: access_token
//     ) {
//         addQuestion(
//             timeLimit: $timeLimit
//             title: $title
//             score: $score
//             description: $description
//             user_id: $user_id
//             access_token: $acces_token
//         ) {
//             id
//             title
//             score
//             description
//             user_id
//         }
//     }
// `

// export const POST_SOLUTION = gql`
//     mutation AddSolution(
//         $input: input
//         $output: output
//         $access_token: access_token
//         $question_id: question_id
//     ) {
//         addSolution(
//             input: $input
//             output: $output
//             access_token: $access_token
//             question_id: $question_id
//         ) {
//             _id
//             input
//             output
//         }
//     }
// `

// export const POST_SAMPLE_SOLUTION = gql`
//     mutation AddSampleSolution(
//         $input: input
//         $output: output
//         $access_token: access_token
//         $question_id: question_id
//     ) {
//         addSampleSolution(
//             input: $input
//             output: $output
//             access_token: $access_token
//             question_id: $question_id
//         ) {
//             _id
//             input
//             output
//         }
//     }
// `

import { gql } from "@apollo/client";

export const CREATE_QUESTION_MATH = gql`
    mutation createQuestionMath($create_question_math: CreateQuestionMathDto!) {
        createQuestionMath(create_question_math: $create_question_math){
            code
            download_url
        }
    }
`;
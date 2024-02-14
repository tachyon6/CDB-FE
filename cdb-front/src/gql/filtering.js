import { gql } from "@apollo/client";

export const FILTER_QUESTION_MATH = gql`
    query getFilterQuestionMath($filter_question_math: FilterQuestionMathDto!) {
        getFilterQuestionMath(filter_question_math: $filter_question_math)
    }
`;

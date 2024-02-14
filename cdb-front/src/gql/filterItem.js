import { gql } from "@apollo/client";

export const GET_ALL_SUBJECT_MATH = gql`
    query {
        getAllSubjectMath {
            id
            name
            bot {
                id
                name
            }
        }
    }
`;

export const GET_ALL_DIFF_MATH = gql`
    query {
        getAllDiffMath {
            id
            name
        }
    }
`;

export const GET_ALL_MONTH_MATH = gql`
    query {
        getAllMonthMath {
            id
            name
        }
    }
`;

export const GET_ALL_TAG_MATH = gql`
    query {
        getAllTagMath {
            id
            name
        }
    }
`;


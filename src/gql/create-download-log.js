import { gql } from "@apollo/client";

export const CREATE_DOWNLOAD_LOG = gql`
    mutation createDownloadLog($title: String!, $input: String!) {
        createDownloadLog(title: $title, input: $input)
    }
`;

export const GET_DOWNLOAD_LOGS_BY_DATE = gql`
    query getDownloadLogByDay($date: String!) {
        getDownloadLogByDay(date: $date) {
            id
            title
            input
            created_at
        }
    }
`;
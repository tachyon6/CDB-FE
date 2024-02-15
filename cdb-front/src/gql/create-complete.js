import { gql } from "@apollo/client";

export const CREATE_COMPLETE_FILE = gql`
    mutation combine($complete_file_input: CompleteFileInput!) {
        combine(complete_file_input: $complete_file_input)
    }
`;

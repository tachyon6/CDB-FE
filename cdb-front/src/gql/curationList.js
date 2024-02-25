import { gql } from "@apollo/client";

export const GET_ALL_CURATION = gql`
    query getCurationList {
        getCurationList {
            id
            subject
            name
            list
        }
    }
`;

export const CREATE_CURATION_LIST = gql`
    mutation createCurationList($create_curation_list: CreateCurationListDto!) {
        createCurationList(create_curation_list: $create_curation_list)
    }
`;

export const DELETE_CURATION_LIST = gql`
    mutation deleteCurationList($curation_id: Float!) {
        deleteCurationList(curation_id: $curation_id)
    }
`;

export const UPDATE_CURATION_LIST = gql`
    mutation updateCurationList($curation_id: Float!, $create_curation_list: CreateCurationListDto!) {
        updateCurationList(curation_id: $curation_id, create_curation_list: $create_curation_list)
    }
`;

import { gql } from "@apollo/client";

export const GET_ADMIN_JWT_TOKEN = gql`
    query adminCodeToJwt($code: String!) {
        adminCodeToJwt(code: $code){
            accessToken
        }
    }
`;

export const CHECK_IS_ADMIN_AUTHENTICATED = gql`
    query adminCheck{
        adminCheck
    }
`;
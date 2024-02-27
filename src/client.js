import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

export const SERVER_URL = "https://quark-api.tachyon6.com/graphql";

const SERVER_URL_HTTP = "http://3.35.132.93:8080/graphql";

const DEV_SERVER_URL = "http://localhost:8080/graphql";

const httpLink = new HttpLink({
  uri: SERVER_URL,
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;

import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const SERVER_URL = "http://3.38.108.229:8080/graphql";

const DEV_SERVER_URL = "http://localhost:8080/graphql";

const httpLink = new HttpLink({
  uri: SERVER_URL,
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;

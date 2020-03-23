import fetch from 'cross-fetch';
import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache
} from '@apollo/client';

const createClient = (authToken: string) => {
  const uri = process.env.GATSBY_GRAPHQL_ENDPOINT;

  const httpLink = createHttpLink({
    uri,
    fetch
  });

  const authLink = new ApolloLink((operation, forward) => {
    operation.setContext({
      headers: {
        authorization: authToken ? `Bearer ${authToken}` : ''
      }
    });

    return forward(operation);
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  });

  return client;
};

export default createClient;
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import theme from "./theme";

const httpLink = createHttpLink({
  uri: 'https://music-share-jdb.hasura.app/v1/graphql'
})

const authLink = setContext((_, { headers }) => {
  const token = `${process.env.REACT_APP_TOKEN}`;
  return {
    headers: {
      ...headers,
      "x-hasura-admin-secret": token
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
  <ApolloProvider client={client}>
    <CssBaseline />
    <App />
  </ApolloProvider>
  </MuiThemeProvider>,
  document.getElementById("root")
);

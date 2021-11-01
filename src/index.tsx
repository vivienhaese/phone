import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  ApolloLink,
  concat,
} from "@apollo/client";
import { AppProvider } from "./context/context";
import { AuthResponseType } from "./model/models";

const httpLink = new HttpLink({
  uri: "https://frontend-test-api.aircall.io/graphql",
});

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: "Bearer " + localStorage.getItem("token") || null,
    },
  }));
  // Todo: refresh token and expired token
  return forward(operation).map((data) => {
    if (data.errors?.length && data.errors[0].message === "Unauthorized") {
      console.log("Handle unauthorized response, redirect to login");
    }
    if (operation.operationName === "Login") {
      const token = (data.data as AuthResponseType)?.login?.access_token;
      console.log(`Token received ${token}`);
      localStorage.setItem("token", token);
    }
    return data;
  });
});

const client = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache(),
  name: "vhAircallTest",
  version: "1.0",
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <AppProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AppProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

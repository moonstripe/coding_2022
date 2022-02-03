// require('dotenv').config();
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter } from "react-router-dom";

// Apollo imports
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider
} from "@apollo/client";

console.log(process.env);

const client = new ApolloClient({
  // include your sanity api including database and 'default'
  uri: 'https://s7hkd94g.api.sanity.io/v1/graphql/production/default',
  cache: new InMemoryCache()
});


ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
      <App />
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

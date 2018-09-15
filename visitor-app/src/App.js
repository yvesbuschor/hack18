import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import routes from 'routes';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import Playground from './Scenes/Playground';
import List from './Scenes/List';
import Detail from './Scenes/Detail';

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL
});

const App = () => (
  <Router>
    <ApolloProvider client={client}>
      <Route exact path={routes.root} component={List}/>
      <Route path={routes.playground} component={Playground}/>
      <Route path={routes.detail} component={Detail}/>
    </ApolloProvider>
  </Router>
);

export default App;

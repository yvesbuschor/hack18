import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import routes from 'routes';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import Playground from './Scenes/Playground';
import List from './Scenes/List';
import Detail from './Scenes/Detail';

const AppContext = React.createContext({});

export const AppProvider = AppContext.Provider;
export const AppConsumer = AppContext.Consumer;

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL
});

class App extends React.Component {
  state = {
    filterFavOnly: false,
  };

  updateValue = (key, val) => {
    this.setState({[key]: val});
 }

  render() {
    return (
      <Router>
        <ApolloProvider client={client}>
          <AppProvider value={this.state} >
            <Route exact path={routes.root} component={List}/>
            <Route path={routes.playground} component={Playground}/>
            <Route path={routes.detail} component={Detail}/>
          </AppProvider>
        </ApolloProvider>
      </Router>
    );
  }
};

export default App;

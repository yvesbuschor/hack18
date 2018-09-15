import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import routes from 'routes';

import Playground from './Scenes/Playground';
import List from './Scenes/List';
import Detail from './Scenes/Detail';

const App = () => (
  <Router>
    <React.Fragment>
      <Route exact path={routes.root} component={List}/>
      <Route path={routes.playground} component={Playground}/>
      <Route path={routes.detail} component={Detail}/>
    </React.Fragment>
  </Router>
);

export default App;

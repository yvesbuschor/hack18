import React from 'react';
import { Link } from 'react-router-dom';
import routes from 'routes';
import AppBar from '../../Components/AppBar';


const ListView = () => {
  return (
    <React.Fragment>
      <AppBar withSecondaryMenu />
      <p>ListView</p>
    </React.Fragment>
  );
};

export default ListView;

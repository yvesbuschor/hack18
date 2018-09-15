import React from 'react';
import { Link } from 'react-router-dom';
import routes from 'routes';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import AppBar from '../../Components/AppBar';


const DetailView = ({ match }) => {
  return (
    <React.Fragment>
      <AppBar />
      <p>DetailView {match.params.id}</p>
    </React.Fragment>
  );
};

export default DetailView;

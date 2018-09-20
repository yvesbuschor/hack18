import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import AppBar from 'Components/AppBar';

const Playground = () => (
  <React.Fragment>
    <AppBar />
    <Card>
      <CardContent>
        <h1>Playground</h1>
      </CardContent>
    </Card>
  </React.Fragment>
);

export default Playground;

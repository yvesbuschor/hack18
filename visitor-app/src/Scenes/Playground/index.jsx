import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import AppBar from 'Components/AppBar';
import WaitingTimeIcon from 'Components/WaitingTimeIcon';

const Playground = () => (
  <React.Fragment>
    <AppBar />
    <Card>
      <CardContent>
        <h1>PLAYGROUND</h1>
        <WaitingTimeIcon count={0} />
        <WaitingTimeIcon count={1} />
        <WaitingTimeIcon count={2} />
        <WaitingTimeIcon count={3} />
      </CardContent>
    </Card>
  </React.Fragment>
);

export default Playground;

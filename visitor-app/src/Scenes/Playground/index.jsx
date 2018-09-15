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
        <WaitingTimeIcon time={3} />
        <WaitingTimeIcon time={10} />
        <WaitingTimeIcon time={20} />
        <WaitingTimeIcon time={45} />
      </CardContent>
    </Card>
  </React.Fragment>
);

export default Playground;

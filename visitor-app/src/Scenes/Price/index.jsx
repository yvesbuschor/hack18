import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import AppBar from 'Components/AppBar';


const Price = () => (
  <React.Fragment>
    <AppBar />
    <div style={{ textAlign: 'center', padding: '24px' }}>
      <Typography gutterBottom variant="headline" component="h2">
        Get a free cuddly atom
      </Typography>
      <Typography component="p">
        Show the following win-code at the next souvenier shop<br />and get a plush atom to cuddle with.
      </Typography>
      <Typography gutterBottom variant="headline" component="h3" style={{marginTop: '48px'}}>
        AT0M123-WIN
      </Typography>
    </div>
  </React.Fragment>
);

export default Price;

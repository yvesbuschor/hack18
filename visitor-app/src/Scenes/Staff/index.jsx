import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import AppBar from 'Components/AppBar';
import WaitingTimeIcon from 'Components/WaitingTimeIcon';
import QrReader from 'react-qr-reader'

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const CHANGE_TIME = gql`
mutation UpdateTime($waitingTime: Int!) {
  updatePointOfInterest(id: "point_1", waitingTime: $waitingTime) {
        pointOfInterest {
          waitingTime,
          userFavorited
        }
        ok
  }
}
`;

function ChangeWaitingTime(props) {
  const { classes } = props;
  return (
    <Mutation mutation={CHANGE_TIME}>
    {(updateTime, { data }) => (
        <div>
          <h2>Alice: Waiting Times</h2>
          <div>
            <Button variant="contained" size="large" className={classes.button} onClick={()=>updateTime({ variables: { waitingTime: 0 }})}>
              0 Minutes
            </Button>
            <Button variant="contained" size="large" className={classes.button} onClick={()=>updateTime({ variables: { waitingTime: 15 }})}>
              15 Minutes
            </Button>
            <Button variant="contained" size="large" color="primary" className={classes.button} onClick={()=>updateTime({ variables: { waitingTime: 30 }})}>
              30 Minutes
            </Button>
            <Button variant="contained" size="large" color="primary" className={classes.button} onClick={()=>updateTime({ variables: { waitingTime: 45 }})}>
              45 Minutes
            </Button>
            <Button variant="contained" size="large" color="secondary" className={classes.button} onClick={()=>updateTime({ variables: { waitingTime: 60 }})}>
              60 Minutes
            </Button>
            <Button variant="contained" size="large" color="secondary" className={classes.button} onClick={()=>updateTime({ variables: { waitingTime: 90 }})}>
              90 Minutes
            </Button>
          </div>
        </div>
      )}
    </Mutation>
  );
}

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});

const ChangeWaitingTimeWrapper = withStyles(styles)(ChangeWaitingTime);



class Test extends Component {
  constructor(props){
    super(props)
    this.state = {
      delay: 100,
    }
    this.handleScan = this.handleScan.bind(this)
  }
  handleScan(data){
    if (data){
      window.location.href = data
    }
  }
  handleError(err){
    console.error(err)
  }
  render(){
    return(
      <div>
        <QrReader
          delay={this.state.delay}
          onError={this.handleError}
          onScan={this.handleScan}
          style={{ width: '100%' }}
          />
      </div>
    )
  }
  }

const Playground = () => (
  <React.Fragment>
    <AppBar />
    <Card>
      <CardContent>
        <ChangeWaitingTimeWrapper />
      </CardContent>
    </Card>
  </React.Fragment>
);

export default Playground;

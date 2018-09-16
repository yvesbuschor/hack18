import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import AppBar from 'Components/AppBar';
import WaitingTimeIcon from 'Components/WaitingTimeIcon';
import QrReader from 'react-qr-reader'

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
        <Test />
      </CardContent>
    </Card>
  </React.Fragment>
);

export default Playground;

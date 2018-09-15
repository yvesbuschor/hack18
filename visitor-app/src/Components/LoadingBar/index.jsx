import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = {
  root: {
    flexGrow: 1,
    height: '5px',
    maxHeight: '5px',
    position: 'relative',
  }
};

class LoadingBar extends React.Component {
  render() {
    const { classes, loading = false } = this.props;

    return (
      <div className={classes.root}>
        {loading && (<LinearProgress />)}
      </div>
    );
  }
}

export default withStyles(styles)(LoadingBar);
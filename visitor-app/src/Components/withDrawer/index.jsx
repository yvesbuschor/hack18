import React from 'react';
import { Link } from 'react-router-dom';
import routes from 'routes';
import { withStyles } from '@material-ui/core/styles';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const styles = {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
};

export default function withDrawer(WrappedComponent) {
  class WithDrawer extends React.Component {
    state = {
      drawerOpen: false,
    };
  
    toggleDrawer = () => {
      this.setState({ drawerOpen: !this.state.drawerOpen });
    };

    render() {
      const { drawerOpen } = this.state;
      const { classes, ...propsToPass } = this.props;
  
      return (
        <React.Fragment>
          <WrappedComponent {...propsToPass} toggleDrawer={this.toggleDrawer} />
          <Drawer open={this.state.drawerOpen} onClose={this.toggleDrawer}>
            <div
              tabIndex={0}
              role="button"
              onClick={this.toggleDrawer}
              onKeyDown={this.toggleDrawer}
              >
              <div className={classes.list}>
                <List>
                  <ListItem button>
                    <Link to={routes.root}><ListItemText primary="Exhibits" /></Link>
                  </ListItem>
                  <ListItem button>
                    <Link to={routes.playground}><ListItemText primary="Map" /></Link>
                  </ListItem>
                </List>
              </div>
            </div>
          </Drawer>
        </React.Fragment>
      );
    }
  }
  const Styled = withStyles(styles)(WithDrawer);

  return Styled;
};
import React from 'react';
import { Link } from 'react-router-dom';
import routes from 'routes';
import { withStyles } from '@material-ui/core/styles';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';


const styles = {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  }
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
          <Drawer open={drawerOpen} onClose={this.toggleDrawer}>
            <div
              tabIndex={0}
              role="button"
              onClick={this.toggleDrawer}
              onKeyDown={this.toggleDrawer}
              >
              <div className={classes.list}>
                <List>
                  <Link className={classes.link} to={routes.root}>
                    <ListItem button>
                      <ListItemText primary="Exhibits" />
                    </ListItem>
                  </Link>
                  <Link className={classes.link} to={routes.scan}>
                    <ListItem button>
                      <ListItemText primary="Scan QR Code" />
                    </ListItem>
                  </Link>
                  <Link className={classes.link} to={routes.staff}>
                    <ListItem button>
                        <ListItemIcon>
                          <AssignmentIndIcon />
                        </ListItemIcon>
                        <ListItemText primary="STAFF" />
                    </ListItem>
                  </Link>
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
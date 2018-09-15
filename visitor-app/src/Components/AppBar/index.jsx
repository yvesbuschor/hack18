import React from 'react';
import { Link } from 'react-router-dom';
import routes from 'routes';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import withDrawer from '../withDrawer';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class AppBarComponent extends React.Component {
  state = {
    anchorEl: null,
  };

  handleMenuOpen = event => {

    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const { classes, toggleDrawer, withSecondaryMenu = false } = this.props;
    const isMenuOpen = Boolean(anchorEl);

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleMenuClose}>Favorites only</MenuItem>
        <MenuItem onClick={this.handleMenuClose}>Filter</MenuItem>
      </Menu>
    );

    return (
      <div className={classes.root}>
        <AppBar position="sticky">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" className={classes.grow}>
              <Link to={routes.root}>CERN Open Days</Link>
            </Typography>
            {withSecondaryMenu && (
              <IconButton className={classes.menuButton} color="inherit" onClick={this.handleMenuOpen}>
                <MoreVertIcon />
              </IconButton>
            )}
          </Toolbar>
        </AppBar>
        {renderMenu}
      </div>
    );
  }
}

const Styled = withStyles(styles)(AppBarComponent);
export default withDrawer(Styled);
import React from 'react';
import { Link } from 'react-router-dom';
import routes from 'routes';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { withStyles } from '@material-ui/core/styles';
import WarningIcon from '@material-ui/icons/Warning';
import CameraEnhanceIcon from '@material-ui/icons/CameraEnhance';
import red from '@material-ui/core/colors/red';
import Button from '@material-ui/core/Button';
import AppBar from 'Components/AppBar';
import LoadingBar from 'Components/LoadingBar';
import Card from './components/Card';


const styles = {
  error: {
    color: red[700],
    display: 'block',
    padding: '24px',
    textAlign: 'center',
  },
  cardsContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  floatButton: {
    textDecoration: 'none',
    color: 'inherit',
    position: 'fixed',
    bottom: '48px',
    right: '48px',
  },
};

const ListView = (props) => (
  <Query
    query={gql`
      {
        pointOfInterest {
          id
          name
          shortDescription
          image1
          estimatedActivityTime
          userWalkingDistance
          userFavorited
          waitingTime
        }
      }
    `}
    pollInterval={500}
  >
    {({ loading, error, data }) => {
      return (
        <React.Fragment>
          <AppBar withSecondaryMenu />
          <LoadingBar loading={loading} />
          {error && (
            <div className={props.classes.error}>
              <p>
                <WarningIcon />
              </p>
              <p>
                Oups!<br />
                Something went wrong.<br />
                Maybe check the server!
              </p>
            </div>
          )}
          <div className={props.classes.cardsContainer}>
          { (!loading && !error) && data.pointOfInterest.map((poi) => (
            <Card key={poi.id} poi={poi} />
          ))}
          </div>
          <Link className={props.classes.floatButton} to={routes.scan}>
            <Button variant="fab" color="primary">
              <CameraEnhanceIcon />
            </Button>
          </Link>
        </React.Fragment>
      )
    }}
  </Query>
);

export default withStyles(styles)(ListView);

import React from 'react';
import { Link } from 'react-router-dom';
import routes from 'routes';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { withStyles } from '@material-ui/core/styles';
import WarningIcon from '@material-ui/icons/Warning';
import red from '@material-ui/core/colors/red';
import LoadingBar from 'Components/LoadingBar';
import Button from '@material-ui/core/Button';
import AppBar from 'Components/AppBar';
import Slider from 'react-slick';
import DetailViewMain from './components/DetailViewMain';


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
  }
};

const GET_POI = gql`
      query PointOfInterest($id: String!) {
        pointOfInterest(id: $id) {
          id
          name
          description
          image1
          image2
          image3
          longitude
          latitude
          category
          subcategory
          estimatedActivityTime
          userWalkingDistance
          userFavorited
          waitingTime
          restrictionChildren
          restrictionMinimumAge
          restrictionReduceMobility
          restrictionsOpenSaturday
          restrictionsOpenSunday
          review {
            id
            name
            text
            imageUrl
          }
        }
      }
    `;


const DetailView = (props) => (
  <Query query={GET_POI} pollInterval={1000} variables={{ id: props.match.params.id }}>
  {({ loading, error, data }) => {
      return (
        <React.Fragment>
          <AppBar backFunction={() => window.location.assign(routes.root)} />
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
          <div>
          { (!loading && !error && data.pointOfInterest.length > 0) && (<DetailViewMain poi={data.pointOfInterest[0]}  />)}
          </div>
        </React.Fragment>
      )
    }}
  </Query>


);

export default withStyles(styles)(DetailView);

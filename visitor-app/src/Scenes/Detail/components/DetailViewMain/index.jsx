import React from 'react';
import { Link } from 'react-router-dom';
import routes from 'routes';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { withStyles } from '@material-ui/core/styles';
import WarningIcon from '@material-ui/icons/Warning';
import LoadingBar from 'Components/LoadingBar';
import Button from '@material-ui/core/Button';
import AppBar from 'Components/AppBar';
import Typography from '@material-ui/core/Typography';
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';
import UpdateIcon from '@material-ui/icons/Update';
import ShareIcon from '@material-ui/icons/Share';
import DirectionsIcon from '@material-ui/icons/Directions';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import WaitingTimeIcon from 'Components/WaitingTimeIcon';




const styles = {
  imageWrapper: {
    width: '100%',
    maxHeight: '250px',
    overflow: 'hidden',
  },
  container: {
    padding: '24px',
  },
  oneLine: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
  },
  titleIcon: {
    marginLeft: '24px',
  },
  infoWrapper: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
    borderTop: '1px solid black',
    borderBottom: '1px solid black',
  },
  infoItem: {
    borderRight: '1px solid black',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: '12px',
    alignItems: 'center',
    textAlign: 'center',
  },
  infoItemLast: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    padding: '12px',
    alignItems: 'center',
    textAlign: 'center',
    cursor: 'pointer'
  },
  description: {
    padding: '24px 0',
  },
  reviewCard: {
    margin: '12px 0',
  },
};


const DetailViewMain = (props) => {
  const { classes, poi } = props;
  console.log({poi});
  return (
    <div>
      <div className={classes.imageWrapper}>
        <img src={poi.image1} />
      </div>
      <div className={classes.container}>
        <div className={classes.oneLine}>
          <Typography gutterBottom variant="headline" component="h2">
            {poi.name}
          </Typography>
          <span>
            <ShareIcon className={classes.titleIcon}/>
            {poi.userFavorited ? <FavoriteIcon className={classes.titleIcon}/> : <FavoriteBorderIcon className={classes.titleIcon}/>}
          </span>
        </div>
        <div className={classes.infoWrapper}>
          <div className={classes.infoItem}>
            <DirectionsWalkIcon />
            <Typography component="p">
              {poi.userWalkingDistance} min <br /> walking distance
            </Typography>
          </div>
          <div className={classes.infoItem}>
            <WaitingTimeIcon time={poi.waitingTime} />
            <Typography component="p">
              ca {poi.waitingTime} min <br /> waiting time
            </Typography>
          </div>
          <div className={classes.infoItemLast} onClick={() => window.location.assign(`http://maps.google.com/maps?q=loc:${poi.latitude},${poi.longitude}`)}>
            <DirectionsIcon />
            <Typography component="p">
              get directions
            </Typography>
          </div>
        </div>
        <div className={classes.description}>
          <Typography component="p">
            {poi.description}
          </Typography>
        </div>
        <hr />
        <Typography gutterBottom variant="headline" component="h2">
          Reviews
        </Typography>
        {
          poi.review.length > 0 && poi.review.map((rev) => (
            <Card className={classes.reviewCard} key={rev.id}>
              <CardHeader
                avatar={
                  rev.imageUrl ? (
                    <Avatar alt={rev.name} src={rev.imageUrl} />

                  ) : (
                    <Avatar>{rev.name.charAt(0)}</Avatar>
                  )
                }
                title={rev.name}
                subheader={rev.id.substring(0,10)}
              />
              <CardContent>
                <Typography component="p">
                  {rev.text}
                </Typography>
              </CardContent>
            </Card>
          ))
        }
      </div>
    </div>
  );
};

export default withStyles(styles)(DetailViewMain);



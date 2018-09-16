import React from 'react';
import { Link } from 'react-router-dom';
import routes from 'routes';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';
import UpdateIcon from '@material-ui/icons/Update';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import WaitingTimeIcon from 'Components/WaitingTimeIcon';


/* **
/* PROPS:
/* poi {
/*   id
/*   name
/*   shortDescription
/*   image
/*   estimatedActivityTime
/*   userWalkingDistance
/*   userFavorited
/*   waitingTime
/* }
** */

const styles = {
  card: {
    width: '100%',
    maxWidth: '850px',
    boxSizing: 'border-box',
  },
  cardWrapper: {
    width: '100%',
    padding: '12px',
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'center',
  },
  media: {
    // ⚠️ object-fit is not supported by IE11.
    objectFit: 'cover',
  },
  link: {
    color: 'inherit',
    textDecoration: 'none',
  },
  bottomInfo: {
    display: 'flex',
    justifyContent: 'center',
  },
  infoWrapper: {
    display: 'flex',
    alignItems: 'center',
    paddingRight: '12px',
  },
  infoWrapperRight: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  infoWrapperRight: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  titleWrapper: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
  }
};


const CardComponent = (props) => {
  const { classes, poi } = props;
  return (
    <div className={classes.cardWrapper}>
      <Card className={classes.card}>

        <Link to={`/detail/${poi.id}`} className={classes.link}>
          <CardActionArea>
            { poi.image1 && <CardMedia
                component="img"
                className={classes.media}
                height="140"
                image={poi.image1}
                title={poi.name}
              />
            }
            <CardContent>
              <div className={classes.titleWrapper}>
                <Typography gutterBottom variant="headline" component="h2">
                  {poi.name}
                </Typography>
                <span>{poi.userFavorited ? <FavoriteIcon /> : <FavoriteBorderIcon />}</span>
              </div>
              <Typography component="p">
                {poi.shortDescription}
              </Typography>
            </CardContent>
            <CardContent className={classes.bottomInfo}>
              <div className={classes.infoWrapper} >
                <DirectionsWalkIcon /> {poi.userWalkingDistance} min
              </div>
              {!!poi.estimatedActivityTime && (
                <div className={classes.infoWrapper} >
                  <UpdateIcon /> {poi.estimatedActivityTime} min
                </div>
              )}
              <div className={classes.infoWrapperRight} >
                <WaitingTimeIcon time={poi.waitingTime} />
              </div>
            </CardContent>
          </CardActionArea>
        </Link>
      </Card>
    </div>
  );
};

export default withStyles(styles)(CardComponent);

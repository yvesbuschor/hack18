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

/* **
/* PROPS:
/* poi {
/*   id
/*   name
/*   shortDescription
/*   image
/*   estimatesActivityTime
/*   userWalkingDistance
/*   userFavorited
/*   waitingTime
/* }
** */

const styles = {
  card: {
    width: '100%',
    maxWidth: '850px',
    margin: '12px',
  },
  media: {
    // ⚠️ object-fit is not supported by IE11.
    objectFit: 'cover',
  },
};


const CardComponent = (props) => {
  const { classes, poi } = props;
  return (
    <Card className={classes.card}>
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
          <Typography gutterBottom variant="headline" component="h2">
            {poi.name}
          </Typography>
          <Typography component="p">
            {poi.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardContent>
        <Typography component="p">
          -- {poi.id}
          -- {poi.waitingTime}
          -- FAV: {poi.userFavorited.toString()}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
      </CardActions>
    </Card>
  );
};

export default withStyles(styles)(CardComponent);

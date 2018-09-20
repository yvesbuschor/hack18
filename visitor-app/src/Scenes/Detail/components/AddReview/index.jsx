import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';

const styles = {
  container: {
    display: 'flex',
    width: '80%',
    margin: '0 auto',
    alignItems: 'center',
  },
  form: {
    flex: 1,
  },
  textField: {
    width: '100%',
  },
  starBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
};

const ADD_REVIEW = gql`
  mutation AddReview($imageUrl: String!, $name: String!, $stars: Int!, $text: String!, $pointId: String!) {
    createReview(imageUrl: $imageUrl, name: $name, stars: $stars, text: $text, pointId: $pointId) {
      review {
         name
         id
         text
         stars
         imageUrl,
       }
       ok
     }
  }
`;



class AddReview extends React.Component {
  state = {
    name: '',
    text: '',
    star: null,
  };

  handleChange = name => event => {
    console.log({name, event});
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes, pointId } = this.props;

    return (
      <Mutation mutation={ADD_REVIEW}>
        {(createReview, { data }) => (
          <div className={classes.container}>
            <form
              className={classes.form}
              onSubmit={e => {
                e.preventDefault();
                createReview({ variables: {
                  imageUrl: '',
                  name: this.state.name,
                  stars: this.state.star,
                  text: this.state.text,
                  pointId,
                }});
              }}
            >
              <TextField
                id="name"
                label="Name"
                className={classes.textField}
                value={this.state.name}
                onChange={this.handleChange('name')}
                margin="normal"
              />
              <div className={classes.starBox}>
                <Radio
                  checked={this.state.star >= 1}
                  onClick={this.handleChange('star')}
                  value="1"
                  color="default"
                  name="star"
                  icon={<StarBorderIcon  />}
                  checkedIcon={<StarIcon  />}
                />
                <Radio
                  checked={this.state.star >= 2}
                  onClick={this.handleChange('star')}
                  value="2"
                  color="default"
                  name="star"
                  icon={<StarBorderIcon  />}
                  checkedIcon={<StarIcon  />}
                />
                <Radio
                  checked={this.state.star >= 3}
                  onClick={this.handleChange('star')}
                  value="3"
                  color="default"
                  name="star"
                  icon={<StarBorderIcon  />}
                  checkedIcon={<StarIcon  />}
                />
                <Radio
                  checked={this.state.star >= 4}
                  onClick={this.handleChange('star')}
                  value="4"
                  color="default"
                  name="star"
                  icon={<StarBorderIcon  />}
                  checkedIcon={<StarIcon  />}
                />
                <Radio
                  checked={this.state.star >= 5}
                  onClick={this.handleChange('star')}
                  value="5"
                  color="default"
                  name="star"
                  icon={<StarBorderIcon  />}
                  checkedIcon={<StarIcon  />}
                />
              </div>
              <TextField
                id="multiline-static"
                label="Comment"
                multiline
                rows="4"
                value={this.state.text}
                onChange={this.handleChange('text')}
                className={classes.textField}
                margin="normal"
              />
              <button type="submit">Submit Review</button>
            </form>
          </div>
        )}
      </Mutation>
    );
  }
};

export default withStyles(styles)(AddReview);

import React from 'react';
import { Link } from 'react-router-dom';
import routes from 'routes';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import AppBar from '../../Components/AppBar';


const ListView = () => (
  <Query
    query={gql`
      {
        pointOfInterest {
          id
          name
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      return (
        <React.Fragment>
          <AppBar withSecondaryMenu />
          <p>ListView</p>
          { data.pointOfInterest.map(({ id, name }) => (
            <div key={id}>
              <p>{`${id}: ${name}`}</p>
            </div>
          ))}
        </React.Fragment>
      )
    }}
  </Query>
);

export default ListView;

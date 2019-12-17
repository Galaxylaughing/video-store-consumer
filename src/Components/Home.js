import React from 'react';
import PropTypes from 'prop-types';

const Home = ({selectedCustomer, selectedMovie}) => {
  return (
    <section>
      <h1>Homepage</h1>
      <p>Selected Customer: { selectedCustomer ? selectedCustomer.name : "none" }</p>
      <p>Selected Movie: { selectedMovie ? selectedMovie.title : "none" }</p>
    </section>
  );
}

Home.propTypes = {
  selectedCustomer: PropTypes.object,
  selectedMovie: PropTypes.object,
}

export default Home;
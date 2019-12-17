import React from 'react';
import PropTypes from 'prop-types';

const Home = ({selectedCustomer}) => {
  return (
    <section>
      <h1>Homepage</h1>
      <span>Selected Customer: { selectedCustomer ? selectedCustomer.name : "none" }</span>
    </section>
  );
}

Home.propTypes = {
  selectedCustomer: PropTypes.object,
}

export default Home;
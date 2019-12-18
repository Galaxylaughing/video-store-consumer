import React from 'react';
import PropTypes from 'prop-types';
import '../App.css';

const Home = ({selectedCustomer, selectedMovie, onCheckoutClick, checkoutResponse}) => {
  return (
    <section>
      <h1>Homepage</h1>

      <section>
        { checkoutResponse.checkoutSuccess
          ? <p className="success-message">Successfully checked out {selectedMovie.title} to {selectedCustomer.name}</p>
          : ''
        }

        { checkoutResponse.checkoutError
          ? <p className="error-message">Unable to checkout, encountered an error: {checkoutResponse.checkoutError}</p>
          : ''
        }
      </section>

      <section>
        <p>Selected Customer: { selectedCustomer ? <span>{selectedCustomer.name}, {selectedCustomer.movies_checked_out_count} movies checked out</span> : "none" }</p>
        <p>Selected Movie: { selectedMovie ? <span>{selectedMovie.title}, {selectedMovie.inventory}</span> : "none" }</p>

        { (selectedCustomer && selectedMovie)
          ? <button onClick={onCheckoutClick}>Checkout '{selectedMovie.title}' to {selectedCustomer.name}</button>
          : '' 
        }
        
      </section>
    </section>
  );
}

Home.propTypes = {
  selectedCustomer: PropTypes.object,
  selectedMovie: PropTypes.object,
  onCheckoutClick: PropTypes.func.isRequired,
  checkoutResponse: PropTypes.object,
}

export default Home;

import React from 'react';
import PropTypes from 'prop-types';
import '../App.css';
import './Checkout.css';

const Checkout = ({selectedCustomer, selectedMovie, onCheckoutClick, checkoutResponse}) => {
  console.log(selectedMovie);
  return (
    <div>
      <section className="App-checkout">
        <div className="App-checkout-details">
          <p>Selected Customer: { selectedCustomer 
            ? <span>{selectedCustomer.name}, {selectedCustomer.movies_checked_out_count} 
              {selectedCustomer.movies_checked_out_count === 1 ? " movie" : " movies"} checked out</span> 
            : "none" }</p>
          <p>Selected Movie: { selectedMovie ? <span>{selectedMovie.title}</span> : "none" }</p>
        </div>

        <div className="App-checkout-button">
          { (selectedCustomer && selectedMovie)
            ? <button onClick={onCheckoutClick}>Checkout '{selectedMovie.title}' to {selectedCustomer.name}</button>
            : '' 
          }
        </div>
      </section>

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
    </div>
  );
}

Checkout.propTypes = {
  selectedCustomer: PropTypes.object,
  selectedMovie: PropTypes.object,
  onCheckoutClick: PropTypes.func.isRequired,
  checkoutResponse: PropTypes.object,
}

export default Checkout;

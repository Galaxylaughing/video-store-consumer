import React from 'react';
import PropTypes from 'prop-types';
import './Home.css';

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
        <p>Selected Customer: { selectedCustomer ? selectedCustomer.name : "none" }</p>
        <p>Selected Movie: { selectedMovie ? selectedMovie.title : "none" }</p>

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

// params[:customer_id]
// params[:due_date]
// params[:title]

// http://localhost:3000/rentals/Jaws/check-out?customer_id=1&due_date=2019/12/18
// http://localhost:3000/:title/check-out?customer_id=:customer_id&due_date=:due_date

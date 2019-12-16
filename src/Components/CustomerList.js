import React from 'react';
import PropTypes from 'prop-types';
import CustomerRow from './CustomerRow';
import './CustomerList.css';

const CustomerList = (props) => {

  const selectCustomer = ( customerId ) => {
    this.props.selectCustomer(customerId);
  }

  const makeCustomerList = (customers) => {
    return customers.map((customer, i) => {
      return <CustomerRow 
        {...customer}
        key={i}
        selectCustomer={ props.selectCustomer }
      />
    });
  }

  return (
    <section>
      <h1>Customers</h1>
      <table className="customer-list">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Movies Checked Out</th>
            <th>Account Credit</th>
            <th>Address</th>
            <th>Phone Number</th>
            <th>Registrated Date</th>
            <th>Select Customer</th>
          </tr>
        </thead>
        <tbody>
          { makeCustomerList(props.customers) }
        </tbody>
      </table>

    </section>
  );
}

CustomerList.propTypes = {
  selectCustomer: PropTypes.func.isRequired,
  customers: PropTypes.array.isRequired,
}

export default CustomerList;
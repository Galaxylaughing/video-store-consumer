import React from 'react';
import PropTypes from 'prop-types';
import CustomerRow from './CustomerRow';
import './CustomerList.css';
import '../App.css'; //error message, header formatting

const CustomerList = ({selectCustomer, customers, selectedCustomer}) => {

  const makeCustomerList = (customers) => {
    return customers.map((customer, i) => {
      return <CustomerRow 
        {...customer}
        key={i}
        selectCustomer={ selectCustomer }
        isSelected={ selectedCustomer === customer ? true : false }
      />
    });
  }

  return (
    <section>
      <h2 className="header">Customers</h2>
      <table className="customer-table">
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
          { makeCustomerList(customers) }
        </tbody>
      </table>

    </section>
  );
}

CustomerList.propTypes = {
  selectCustomer: PropTypes.func.isRequired,
  customers: PropTypes.array.isRequired,
  selectedCustomer: PropTypes.object,
}

export default CustomerList;
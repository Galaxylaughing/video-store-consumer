import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import CustomerRow from './CustomerRow';
import './CustomerList.css';

class CustomerList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customers: [],
      error: undefined,
      selectedCustomer: undefined,
    };
  }

  componentDidMount() {
    axios.get('http://localhost:3000/customers')
      .then((response) => {
        this.setState({
          customers: response.data,
        });
      })
      .catch((error) => {
        this.setState({ error: error.message });
      });
  }

  selectCustomer = ( customerId ) => {
    const { customers } = this.state;
    const selectedCustomer = customers.find((customer) => {
      return customer.id === customerId;
    });

    this.setState({selectedCustomer});
  }

  makeCustomerList = (customers) => {
    return customers.map((customer, i) => {
      return <CustomerRow 
        {...customer}
        key={i}
        selectCustomer={ this.selectCustomer }
      />
    });
  }

  render() {
    return (
      <section>
        <h1>Customers</h1>
        { this.state.error ? <div className="error-message">{this.state.error}</div> : "" }
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
            { this.makeCustomerList(this.state.customers) }
          </tbody>
        </table>

      </section>
    );
  }
}

CustomerList.propTypes = {

}

export default CustomerList;
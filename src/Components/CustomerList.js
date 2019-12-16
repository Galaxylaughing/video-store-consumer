import React, { Component } from 'react';
import axios from 'axios';
import CustomerRow from './CustomerRow';
import './CustomerList.css';

class CustomerList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customers: [],
      error: undefined,
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

  makeCustomerList = (customers) => {
    return customers.map((customer, i) => {
      return <CustomerRow 
        {...customer}
        key={i}
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

export default CustomerList;
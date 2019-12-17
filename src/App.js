import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import CustomerList from './components/CustomerList';
import MovieList from './components/MovieList';
import Home from './components/Home';

class App extends Component {
  constructor() {
    super();

    this.state = {
      customers: [],
      selectedCustomer: undefined,
      error: undefined,
    }
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
    console.log("selecting", customerId);
    
    const { customers } = this.state;
    const selectedCustomer = customers.find((customer) => {
      return customer.id === customerId;
    });

    this.setState({selectedCustomer});
  }

  render() {
    return (
      <Router>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/search">Search</Link>
            </li>
            <li>
              <Link to="/library">Library</Link>
            </li>
            <li>
              <Link to="/customers">Customers</Link>
            </li>
          </ul>
        </nav>

        { this.state.error ? <div className="error-message">{this.state.error}</div> : "" }

        <Switch>
          <Route path="/search">
            <Search />
          </Route>
          <Route path="/library">
            <MovieList />
          </Route>
          <Route path="/customers">
            <CustomerList 
              selectCustomer={ this.selectCustomer } 
              customers={ this.state.customers } 
              selectedCustomer={ this.state.selectedCustomer } 
            />
          </Route>
          <Route path="/">
            <Home 
              selectedCustomer={ this.state.selectedCustomer }
            />
          </Route>
        </Switch>
      </Router>
    );
  }
}

function Search() {
  return <h1>Search for a Movie</h1>;
}



export default App;

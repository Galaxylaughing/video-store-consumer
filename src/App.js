import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import axios from 'axios';
// import logo from './logo.svg';
import './App.css';
import CustomerList from './components/CustomerList';
import MovieList from './components/MovieList';
import Home from './components/Home';
import MovieSearch from './components/MovieSearch';
import { throwStatement } from '@babel/types';

class App extends Component {
  constructor() {
    super();

    this.state = {
      customers: [],
      selectedCustomer: undefined,
      error: undefined,
      movies: [],
      selectedMovie: undefined,
      foundMovie: undefined,
      checkoutResponse: {
        checkoutSuccess: undefined,
        checkoutError: undefined,
      },
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

    axios.get('http://localhost:3000/movies')
      .then((response) => {
        this.setState({ movies: response.data });
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

  selectMovie = (movieId) => {
    const { movies } = this.state;

    const selectedMovie = movies.find((movie) => {
      return movie.id === movieId;
    });

    this.setState({ selectedMovie });
    console.log(selectedMovie)
  }

  findMovie = (movieTitle)  => {
    console.log(movieTitle.title)
    axios.get(`http://localhost:3000/movies/${movieTitle.title}`)
      .then((response) => {
        this.setState({ foundMovie: response.data });
      })
      .catch((error) => {
        this.setState({ error: error.message });
      });
  }

  onCheckoutClick = () => {
    const { selectedMovie, selectedCustomer } = this.state;
    const movieTitle = selectedMovie.title;
    const customerId = selectedCustomer.id;
    console.log(`checking out ${movieTitle} to ${customerId}`);

    // make checkoutDate
    let currentDate = new Date()
    const checkoutDate = currentDate.getDate();
    const checkoutMonth = currentDate.getMonth() + 1; //months are 0-indexed in JS
    const checkoutYear = currentDate.getFullYear();
    console.log("today", checkoutDate, checkoutMonth, checkoutYear);

    // make dueDate a week from now
    // calculation future date from: https://stackoverflow.com/questions/1025693/how-to-get-next-week-date-in-javascript
    const dueDate = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000);
    console.log("due date", dueDate);

    // set up params for axios call
    const checkoutParams = {
      customer_id: customerId,
      due_date: dueDate,
    }
    // make axios post request
    axios.post(`http://localhost:3000/rentals/${movieTitle}/check-out`, checkoutParams)
      .then((response) => {
        console.log(response.data);
        this.setState({
          checkoutResponse: {
            checkoutSuccess: response.data, // returns empty object
            checkoutError: undefined,
          }
        })
      })
      .catch((error) => {
        console.log(error.message);
        this.setState({
          checkoutResponse: {
            checkoutSuccess: undefined,
            checkoutError: error.message,
          }
        })
      });
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
            <MovieSearch 
            findMovieCallback={ this.findMovie }
            foundMovie={this.state.foundMovie}/>
          </Route>
          <Route path="/library">
            <MovieList 
            selectMovieCallback={ this.selectMovie } 
            movies={ this.state.movies } 
            selectedMovie={ this.state.selectedMovie }/>
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
              selectedMovie={ this.state.selectedMovie }
              onCheckoutClick={ this.onCheckoutClick }
              checkoutResponse={ this.state.checkoutResponse }
            />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;

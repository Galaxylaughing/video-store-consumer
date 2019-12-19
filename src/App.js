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
import FlashMessage from './components/FlashMessage';
import Checkout from './components/Checkout';

class App extends Component {
  constructor() {
    super();

    this.state = {
      customers: [],
      selectedCustomer: undefined,
      error: undefined,
      movies: [],
      selectedMovie: undefined,
      foundMovie: [],
      success: undefined,
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
        let errorMessage = '';
        if (error.response.data.errors) {
          errorMessage = error.response.data.errors.title;
        } else {
          errorMessage = error.message;
        }
        this.setState({ error: errorMessage });
      });
  }

  addMovie = (movie)  => {
    axios.post(`http://localhost:3000/movies/`, movie)
      .then((response) => {
        let { movies } = this.state;
        movies.push(movie);
        this.setState({ movies: movies, success: response.data });
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

    // make dueDate a week from now
    // calculation future date from: https://stackoverflow.com/questions/1025693/how-to-get-next-week-date-in-javascript
    const currentDate = new Date()
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

        // add one to customer's movies checked out count
        const { customers } = this.state;
        const customer = customers.find((customer) => customer.id === customerId)
        customer.movies_checked_out_count += 1;

        const { selectedMovie, selectedCustomer } = this.state;
        this.setState({
          customers,
          success: `Successfully checked out ${selectedMovie.title} to ${selectedCustomer.name}`,
          error: undefined,
        })
      })
      .catch((error) => {
        console.log(error.message);
        this.setState({
          error: `Unable to checkout, encountered an error: ${error.message}`,
          success: undefined,
        })
      });
  }

  render() {
    return (
      <Router>
        <nav className="App-nav">
          <ul className="App-nav--list">
            <li className="App-nav--list-item">
              <Link to="/">Home</Link>
            </li>
            <li className="App-nav--list-item">
              <Link to="/search">Search</Link>
            </li>
            <li className="App-nav--list-item">
              <Link to="/library">Library</Link>
            </li>
            <li className="App-nav--list-item">
              <Link to="/customers">Customers</Link>
            </li>
          </ul>
        </nav>

        <Checkout 
          selectedCustomer={ this.state.selectedCustomer }
          selectedMovie={ this.state.selectedMovie }
          onCheckoutClick={ this.onCheckoutClick }
        />

        { this.state.error ? <FlashMessage messageContents={this.state.error} messageClass="error-message" /> : "" }
        { this.state.success ? <FlashMessage messageContents={this.state.success} messageClass="success-message" /> : "" }

        <Switch>
          <Route path="/search">
            <MovieSearch 
            findMovieCallback={ this.findMovie }
            foundMovie={this.state.foundMovie}
            addMovieCallback={this.addMovie}/>
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
            <Home />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;

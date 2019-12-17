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
import MovieSearch from './components/MovieSearch';

class App extends Component {
  constructor() {
    super();

    this.state = {
      customers: [],
      selectCustomer: undefined,
      error: undefined,
      movies: [],
      selectedMovie: undefined,
      foundMovie: undefined,
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

  componentDidMount() {
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
            <Home />
          </Route>
        </Switch>
      </Router>
    );
  }
}

function Home() {
  return <h1>Homepage</h1>;
}




export default App;

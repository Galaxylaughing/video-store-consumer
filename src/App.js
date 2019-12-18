import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import axios from 'axios';
// import FlashMessage from 'react-flash-message';
// import logo from './logo.svg';
import './App.css';
import CustomerList from './components/CustomerList';
import MovieList from './components/MovieList';
import Home from './components/Home';
import MovieSearch from './components/MovieSearch';
import FlashMessage from './components/FlashMessage';

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
        console.log(error.response);
        this.setState({ error: `${error.message}; ${error.response.data.errors.title}` });
      });
  }

  addMovie = (movie)  => {
    axios.post(`http://localhost:3000/movies/`, movie)
      .then((response) => {
        let { movies } = this.state;
        movies.push(movie);

        this.setState({ 
            movies: movies, 
            success: `${movie.title} was successfully added to the library`,
            foundMovie: [],
        });
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

        { this.state.error ? <FlashMessage messageContents={this.state.error} messageClass={"error-message"} /> : "" }
        { this.state.success ? <FlashMessage messageContents={this.state.success} messageClass={"success-message"} /> : "" }

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
            <Home 
              selectedCustomer={ this.state.selectedCustomer }
            />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;

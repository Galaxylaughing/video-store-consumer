import React, { Component } from 'react';
import Movie from './Movie';
import axios from 'axios';

class MovieList extends Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      eror: undefined,
      selectedMovie: undefined,
    };
  }

  componentDidMount() {
    axios.get('http://localhost3000/movies')
      .then((response) => {
        this.setState({ movies: response.data });
      })
      .catch((error) => {
        this.setState({ error: error.message });
      });
  }

  makeMoviesCollection () {
    const moviesCollection = this.state.movies.map((movie, i) => {
      return <Movie 
        selectMovieCallback={this.selectMovie}
        id={movie.id}
        title={movie.title}
        overview={movie.overview}
        releaseDate={movie.release_date}
        imageUrl={movie.image_url}
        externalId={movie.external_id}
        key={i}
      />;
    }
    );
    return moviesCollection
  }


  selectMovie = (movieId) => {
    const { movieList } = this.state;

    const currentMovie = movieList.find((movie) => {
      return movie.id === movieId;
    });

    this.setState({ currentMovie });
  }

  render() {
    return (
      <div>
        <ul>
          {this.makeMoviesCollection()}
        </ul>
      </div>
    )
  }
}

export default MovieList;